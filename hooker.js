#!/usr/bin/env node

const cp = require('child_process')
const fs = require('fs')
const http = require('http')
const https = require('https')
const util = require('util')
const path = require('path')
const fse = require('fs-extra')

const PORT = 8055

const endpoints = {
  ready: process.env.WP_READY_DEST,
  clean: process.env.WP_CLEAN_DEST
}

const cacheMountPoint = '/mount-cache'

const onceEvent = (emitter, eventName) =>
  new Promise(resolve =>
    emitter.once(eventName, (...args) => {
      args.length === 1 ? resolve(args[0]) : resolve(args)
    })
  )

const promisifyChild = (child, log) =>
  new Promise((resolve, reject) => {
    const result = {
      code: null,
      error: null,
      stdout: '',
      stderr: ''
    }

    child.addListener('error', error => {
      result.error = error
    })

    child.addListener('exit', code => {
      result.code = code
      resolve(result)
    })

    child.addListener('close', code => {
      result.code = code
      resolve(result)
    })

    child.stdout.on('data', data => {
      if (log) {
        process.stdout.write('BUILD: ' + data.toString())
        result.stdout += data
      }
    })

    child.stderr.on('data', data => {
      if (log) {
        process.stderr.write('BUILD: ' + data.toString())
      }
      result.stderr += data
    })
  })

const cleanEmptyFoldersRecursively = folder => {
  const isDir = fs.statSync(folder).isDirectory()
  if (!isDir) {
    return
  }
  let files = fs.readdirSync(folder)
  if (files.length > 0) {
    files.forEach(file => {
      const fullPath = path.join(folder, file)
      cleanEmptyFoldersRecursively(fullPath)
    })

    files = fs.readdirSync(folder)
  }

  if (files.length === 0) {
    fs.rmdirSync(folder)
  }
}

const timeSince = (since, label) => {
  const now = new Date().getTime()
  const diff = Math.round((now - since) / 1000)
  const seconds = diff % 60
  const minutes = Math.floor(diff / 60)
  console.log(`---- ${label}: ${minutes}m ${seconds}s ----`)
}

const rsync = async (from, to) => {
  const command = cp.spawn('rsync', ['-avh', from, to, '--delete'])
  const syncResult = await promisifyChild(command, false)
  console.log(`rsync result (${from} -> ${to}): `, syncResult)
}

const folderHasContents = async (path, minimum = 1) => {
  let hasContent = false
  try {
    const contents = await fse.readdir(path)
    if (contents.length >= minimum) {
      hasContent = true
    }
  } catch (e) {}

  return hasContent
}

const cleanAndRestorePublic = async () => {
  const publicExists = await fse.pathExists('./public')
  if (publicExists) {
    console.log('removing public folder prior to build')
    await fse.remove('./public')
  }

  await fse.ensureDir('./public/static')

  const mountPublicExists = await fse.pathExists(`${cacheMountPoint}/public`)
  if (mountPublicExists) {
    console.log('restoring public/static from cache mount point')
    await rsync(cacheMountPoint + '/public/', './public/')
  }
}

async function main() {
  const hasCacheMount = await fse.pathExists(cacheMountPoint)

  const state = {
    isBuilding: false,
    childProcess: null
  }

  const cancelBuild = async () => {
    if (state.childProcess) {
      state.childProcess.kill()
      await onceEvent(state.childProcess, 'exit')
    }

    state.isBuilding = false
    state.childProcess = null
  }

  const cacheExists = await fse.pathExists(cacheMountPoint + '/.cache')
  if (cacheExists) {
    console.log(`Valid cache detected at ${cacheMountPoint}`)
  }
  const syncCacheDir = !(await folderHasContents('.cache', 5))
  if (!syncCacheDir) {
    console.log('Not syncing cache dir, .cache already exists and has files')
  }

  if (syncCacheDir && cacheExists) {
    console.log(
      "Container's cache dir is empty and cache-mount detected, copying files."
    )

    try {
      await fse.remove('.cache')
    } catch (e) {}
    await fse.ensureDir('.cache')
    await rsync(`${cacheMountPoint}/.cache/`, '.cache/')
  }

  const server = http.createServer(async (req, res) => {
    if (req.url !== '/trigger-build') {
      return res.end(req.url)
    }

    res.end('ok')

    if (state.isBuilding) {
      console.log('is already building, cancelling current build')
      await cancelBuild()
      console.log('previous build has been cancelled')
    }

    await cleanAndRestorePublic()

    console.log('starting a new build, get some coffee!')
    const start = new Date().getTime()

    if (endpoints.clean) {
      await new Promise(resolve => {
        if (endpoints.clean.indexOf('http://') !== -1) {
          http.get(endpoints.clean, () => resolve())
        } else {
          https.get(endpoints.clean, () => resolve())
        }
      })
    }

    state.isBuilding = true
    state.childProcess = cp.spawn('yarn', ['run', 'build'])

    const result = await promisifyChild(state.childProcess, true)
    const isSuccessful = result.code === 0

    console.log('result:', result)
    console.log('isSuccessful:', isSuccessful)

    timeSince(start, 'Build')

    state.isBuilding = false
    state.childProcess = null

    if (!isSuccessful) {
      const slackData = JSON.stringify({
        attachments: [
          {
            color: 'danger',
            text: 'Failure during build',
            fallback: 'Failure during build'
          }
        ]
      })
      const errorRequest = https.request(
        {
          host: 'hooks.slack.com',
          path: '/services/TCLGWJKC4/BFES1L3B9/mVVZJVyTbQ1o7IfEaf82OX3i',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': slackData.length
          }
        },
        () => {}
      )
      errorRequest.write(slackData)
      errorRequest.end()
      return
    }

    const startCopy = new Date().getTime()

    const copy = cp.spawn('cp', ['-r', './public', '/mount/temp-public'])
    const copyResult = await promisifyChild(copy, false)
    console.log('copy isSuccessful:', copyResult.code === 0)

    timeSince(startCopy, 'Copy')

    const renamePromisified = util.promisify(fs.rename)
    const now = new Date().getTime()
    try {
      await renamePromisified('/mount/public', `/mount/${now}-public`)
    } catch (err) {
      console.log('error public directory', err)
    }
    try {
      await renamePromisified('/mount/temp-public', '/mount/public')
    } catch (err) {
      console.log('error temp public directory into place', err)
    }

    const dirPromisified = util.promisify(fs.readdir)
    try {
      const files = await dirPromisified('/mount')
      if (files.length > 6) {
        // Sort alphabetically z-a
        files.sort((a, b) => (a < b ? 1 : -1))
        for (let i = 6; i < files.length; i++) {
          await fse.remove(path.resolve('/mount', files[i]))
        }
      }
    } catch (err) {
      console.log('error removing old builds', err)
    }

    // Copy netlify config into place
    // await fse.copy('./netlify/_redirects', '/mount/public/_redirects')
    await fse.copy('./now.json', '/mount/public/now.json')
    await fse.copy('./.now', '/mount/public/.now')

    const startPublish = new Date().getTime()

    // Publish to Zeit Now
    state.isBuilding = true
    state.childProcess = cp.spawn(
      'now',
      ['--prod', '-t', 'Gr73xzv4jqCEijr14NAyJ22j'],
      {
        cwd: '/mount/public'
      }
    )

    // Publish to netlify
    // state.isBuilding = true
    // state.childProcess = cp.spawn('./netlifyctl', [
    //   'deploy',
    //   '-y',
    //   '-P',
    //   '/mount/public',
    //   '-C',
    //   '/app/netlify/netlify.toml'
    // ])

    const publishResult = await promisifyChild(state.childProcess, false)
    const publishIsSuccessful = publishResult.code === 0

    // //console.log('result:', publishResult)
    console.log('deploy isSuccessful:', publishIsSuccessful)

    timeSince(startPublish, 'Publish')

    state.isBuilding = false
    state.childProcess = null

    console.log('sending request to wordpress', endpoints)
    if (endpoints.ready) {
      await new Promise(resolve => {
        if (endpoints.ready.indexOf('http://') !== -1) {
          http.get(endpoints.ready, () => resolve())
        } else {
          https.get(endpoints.ready, () => resolve())
        }
      })
    }

    if (hasCacheMount) {
      console.log('caching public/static folder')
      await fse.ensureDir(`${cacheMountPoint}/public/static`)
      await rsync('./public/static/', `${cacheMountPoint}/public/static/`)
    }

    timeSince(start, 'Total')

    /*
    const regex = /(Done in \d*\.\d*s\.\\n)$/g
    const didBuilt = result && result.stdout && regex.test(result.stdout)
    console.log('didBuilt:', didBuilt)
    */
  })

  const onExit = async () => {
    console.log('Caught interrupt signal, saving cache and closing server')
    const hasCacheMount = await fse.pathExists(cacheMountPoint)
    if (hasCacheMount) {
      console.log('Cache mount detected, syncing files')
      await rsync('.cache/', `${cacheMountPoint}/.cache/`)
    }
    server.close()
  }
  process.on('SIGINT', onExit)
  process.on('SIGTERM', onExit)

  server.listen(PORT, (...args) => {
    console.log(`server listening on port ${PORT}`)
  })
}

main().catch(console.error)
