// const sourceNodes = require('gatsby-source-wordpress-updater').sourceNodes

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

const path = require('path')
const { ensureDir, readdir, copy } = require(`fs-extra`)

const each = (xs, f) => xs.forEach(f)
const removeTrailingSlash = p => (p === '/' ? p : p.replace(/\/$/, ''))

exports.onCreateWebpackConfig = ({ stage, actions, getConfig }) => {
  const config = getConfig()

  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules']
    }
  })

  if (stage === 'build-javascript') {
    actions.setWebpackConfig({
      entry: {
        app: ['babel-polyfill', config.entry.app]
      }
    })
  }
}

const postTemplate = path.resolve('./src/templates/post.js')

const gatsbyImageFields = `
  base64
  aspectRatio
  src
  srcSet
  srcWebp
  srcSetWebp
  sizes
`

const gatsbyImageFixedWithWebpFields = `
  base64
  width
  height
  src
  srcSet
  srcWebp
  srcSetWebp
`

const gatsbyImageFixedWithWebpFields_noBase64 = `
  width
  height
  src
  srcSet
  srcWebp
  srcSetWebp
`

const globalDataQuery = `
  query {
    metaData: wordpressSiteMetadata {
      url
      home
    }
    things: allWordpressInnoThings(
      filter: {
        layout: {
          eq: "global-data"
        }
      }
    ) {
      edges {
        node {
          layout
          language {
            code
            hreflang
            prefix
            currency
          }
          acf {
            stringWhyJoinUs: string_why_join_us
            stringSeeMore: string_see_more
            stringTrustedBy: string_trusted_by
            stringGetInTouch: string_get_in_touch
            stringSearch: string_search
            primaryPhoneNumber: primary_phone_number
            secondaryPhoneNumber: secondary_phone_number
          }
        }
      }
    }
  }
`

const postsQuery = `
  fragment Post on wordpress__inno_things {
    id: wordpress_id
    uuid: id
    slug
    link
    layout
    language {
      code
      hreflang
      prefix
      currency
    }
    acf {
      pageLayout: page_layout
			blocks: blocks_gatsby {
        __typename
      }
    }
    alternate {
      au {
        id: translation_id
        hreflang
        path: permalink
      }
      en {
        id: translation_id
        hreflang
        path: permalink
      }
    }
  }

  query {
    things: allWordpressInnoThings(
      filter: {
        type: {
          ne: "private"
        }
        layout: {
          ne: "generic_block"
        }
      }
    ) {
      posts: edges {
        post: node {
          ...Post
        }
      }
    }
  }
`

const coursesQuery = `
  query {
    all: allWordpressInnoThings(
      filter: {
        layout: {
          eq: "courses"
        }
      }
    ) {
      edges {
        node {
          id: wordpress_id
          title
          link
          language {
            code
          }
          acf {
            relationId: course_accreditor {
              id: wordpress_id
              acf {
                accreditorThumbnail: accreditor_thumbnail {
                  file: localFile {
                    sharp: childImageSharp {
                      fixed(width: 320, quality: 80) {
                        ${gatsbyImageFixedWithWebpFields}
                      }
                    }
                  }
                }
              }
            }
            summary: course_summary
            image: course_image {
              file: localFile {
                sharp: childImageSharp {
                  fixed(width: 364, quality: 80) {
                    ${gatsbyImageFixedWithWebpFields}
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

const accreditorsQuery = `
  query {
    all: allWordpressInnoThings(
      filter: {
        layout: {
          eq: "accreditors"
        }
      }
    ) {
      edges {
        node {
          id: wordpress_id
          title
          link
          language {
            code
          }
          acf {
            summary: accreditor_summary
            relationId: accreditor_category {
              id: wordpress_id
            }
            title: accreditor_title
            subtitle: accreditor_subtitle
            inCarousel: accreditor_featured
            thumbnail: accreditor_thumbnail {
              file: localFile {
                sharp: childImageSharp {
                  fixed(width: 185, quality: 80) {
                    ${gatsbyImageFixedWithWebpFields_noBase64}
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

const clientsQuery = `
  query {
    all: allWordpressInnoThings(
      filter: {
        layout: {
          eq: "clients"
        }
      }
    ) {
      edges {
        node {
          id: wordpress_id
          title
          language {
            code
          }
          acf {
            inCarousel: client_featured
            thumbnail: client_image {
              file: localFile {
                sharp: childImageSharp {
                  fixed(width: 185, quality: 80) {
                    ${gatsbyImageFixedWithWebpFields}
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

const careersQuery = `
  query {
    all: allWordpressInnoThings(
      filter: {
        layout: {
          eq: "careers"
        }
      }
    ) {
      edges {
        node {
          id: wordpress_id
          title
          link
          language {
            code
          }
          acf {
            summary: career_summary
            image: career_image {
              file: localFile {
                sharp: childImageSharp {
                  fixed(width: 364, quality: 80) {
                    ${gatsbyImageFixedWithWebpFields}
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

const courseCategoriesQuery = `
  query {
    all: allWordpressInnoThings(
      filter: {
        layout: {
          eq: "categories"
        }
      }
    ) {
      edges {
        node {
          id: wordpress_id
          title
          link
          language {
            code
          }
          acf {
            summary: course_category_summary
            icon
          }
        }
      }
    }
  }
`

const offersQuery = `
  query {
    all: allWordpressInnoThings(
      filter: {
        layout: {
          eq: "offers"
        }
      }
    ) {
      edges {
        node {
          id: wordpress_id
          title
          link
          language {
            code
          }
          acf {
            summary: offer_summary
            relationId: offer_category {
              id: wordpress_id
            }
            image: offer_image {
              file: localFile {
                sharp: childImageSharp {
                  fixed(width: 364, quality: 80) {
                    ${gatsbyImageFixedWithWebpFields}
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

const pagesQuery = `
  query {
    all: allWordpressInnoThings(
      filter: {
        layout: {
          eq: "page"
        },
        acf: {
          page_featured: {
            eq: true
          }
        }
      }
    ) {
      edges {
        node {
          id: wordpress_id
          relationId: wordpress_parent
          title
          link
          language {
            code
          }
          acf {
            summary: page_summary
            thumb: page_image {
              file: localFile {
                sharp: childImageSharp {
                  fixed(width: 364, quality: 80) {
                    ${gatsbyImageFixedWithWebpFields}
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

const offersCategoriesQuery = `
  query {
    all: allWordpressInnoThings(
      filter: {
        layout: {
          eq: "offer_categories"
        }
      }
    ) {
      edges {
        node {
          id: wordpress_id
          title
          link
          language {
            code
          }
          acf {
            icon
          }
        }
      }
    }
  }
`

const prospectusesQuery = `
  query {
    all: allWordpressInnoThings(
      filter: {
        layout: {
          eq: "prospectuses"
        }
      }
    ) {
      edges {
        node {
          id: wordpress_id
          title
          link
          language {
            code
          }
          acf {
            pdf: prospectus_pdf_url
            thumb: prospectus_thumbnail {
              file: localFile {
                sharp: childImageSharp {
                  fixed(width: 344, quality: 80) {
                    ${gatsbyImageFixedWithWebpFields}
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const globalData = await graphql(globalDataQuery).then(
    ({
      data: {
        metaData,
        things: { edges }
      }
    }) =>
      edges.reduce(
        (out, { node }) => {
          return Object.assign(out, { [node.language.code]: node })
        },
        { metaData }
      )
  )

  const { metaData } = globalData

  const {
    data: {
      things: { posts }
    }
  } = await graphql(postsQuery)

  const postsById = posts.reduce((out, { post }) => {
    return Object.assign(out, { [post.id]: post })
  }, {})

  /*
  const createPath = post => {
    const prefix = post.language.code === 'en' ? null : post.language.code

    return `${ prefix ? '/' + prefix : '' }/post/${ post.slug }/`
  }
  */

  const assignRelationId = result => (
    result.data &&
      result.data.all.edges.forEach(
        item => (item.node.acf.relationId = { id: item.node.relationId })
      ),
    result
  )

  const reduceToLanguage = (out, { node }) => {
    out[node.language.code].push(node)

    return out
  }

  const toLanguageObject = ({ data }) => {
    return data
      ? data.all.edges.reduce(reduceToLanguage, { en: [], au: [] })
      : { en: [], au: [] }
  }

  const coursesById = await graphql(coursesQuery)
    .then(result => result.data.all.edges)
    .then(nodes =>
      nodes.reduce((out, { node }) => {
        return Object.assign(out, { [node.id]: node })
      }, {})
    )

  const coursesByLanguage = await graphql(coursesQuery).then(toLanguageObject)

  const accreditorsByLanguage = await graphql(accreditorsQuery).then(
    toLanguageObject
  )

  const careersByLanguage = await graphql(careersQuery)
    .then(assignRelationId)
    .then(toLanguageObject)

  const courseCategoriesByLanguage = await graphql(courseCategoriesQuery).then(
    toLanguageObject
  )

  const offersByLanguage = await graphql(offersQuery).then(toLanguageObject)

  const pagesByLanguage = await graphql(pagesQuery)
    .then(assignRelationId)
    .then(toLanguageObject)

  const offerCategoriesByLanguage = await graphql(offersCategoriesQuery).then(
    toLanguageObject
  )

  const prospectusesByLanguage = await graphql(prospectusesQuery).then(
    toLanguageObject
  )

  const filterByRelation = (items, postId) =>
    items.filter(node => {
      if (Array.isArray(node.acf.relationId)) {
        return node.acf.relationId.some(({ id }) => id === postId)
      } else return node.acf.relationId && node.acf.relationId.id === postId
    })

  const includesAny = (blocks, types) =>
    types.reduce((acc, item) => acc || blocks.includes(item), false)

  each(posts, ({ post }) => {
    const lang = post.language.code
    const link = post.link.replace(metaData.home, '')

    const locales = Object.keys(post.alternate)
      .filter(key => key !== lang)
      .map(key => post.alternate[key])
      .filter(locale => locale.id)

    const blocks =
      post.acf.blocks &&
      post.acf.blocks.map(({ __typename }) => {
        return __typename.replace('WordPressAcf_', '')
      })

    const extra = {}

    if (post.layout === 'courses') {
      extra.accreditorLogo = coursesById[post.id].acf.relationId
        ? coursesById[post.id].acf.relationId.acf.accreditorThumbnail
        : null
    }

    if (Array.isArray(blocks) && blocks.includes('all_subitems')) {
      let pageLayout = post.acf.pageLayout

      if (post.layout === 'accreditors') {
        extra.courses = filterByRelation(coursesByLanguage[lang], post.id)
      }

      if (post.layout === 'categories') {
        extra.accreditors = filterByRelation(
          accreditorsByLanguage[lang],
          post.id
        )
      }

      if (post.layout === 'page' && pageLayout === 'content') {
        extra.pages = filterByRelation(pagesByLanguage[lang], post.id)
      }

      if (post.layout === 'page' && pageLayout === 'career_overview') {
        extra.careers = careersByLanguage[lang]
      }

      if (post.layout === 'page' && pageLayout === 'courses') {
        extra.courseCategories = courseCategoriesByLanguage[lang]
      }

      if (post.layout === 'offer_categories') {
        extra.offers = filterByRelation(offersByLanguage[lang], post.id)
      }

      if (post.layout === 'page' && pageLayout === 'offer_overview') {
        extra.offerCategories = offerCategoriesByLanguage[lang]
      }

      if (post.layout === 'page' && pageLayout === 'offer_overview') {
        extra.offerCategories = offerCategoriesByLanguage[lang]
      }

      if (post.layout === 'page' && pageLayout === 'prospectuses_overview') {
        extra.prospectuses = prospectusesByLanguage[lang]
      }
    }

    createPage({
      // path: createPath(post),
      path: link,
      component: postTemplate,
      context: {
        id: post.id,
        uuid: post.uuid,
        language: post.language,
        locale: post.language.code,
        locales: locales,
        extra: extra
      }
    })
  })
}

async function calculateDirs(store) {
  const program = store.getState().program

  const dirsToCache = [
    path.resolve(program.directory, '.cache'),
    path.resolve(program.directory, 'public')
  ]

  for (const dir of dirsToCache) {
    await ensureDir(dir)
  }

  const dockerVolume = path.resolve(process.env.DOCKER_GATSBY_VOLUME)

  await ensureDir(dockerVolume)

  return {
    dirsToCache,
    dockerVolume
  }
}

exports.onPreInit = async function({ store }) {
  if (!process.env.DOCKER_GATSBY_VOLUME) {
    return
  }

  const { dirsToCache, dockerVolume } = await calculateDirs(store)

  for (const dirPath of dirsToCache) {
    const dirName = path.basename(dirPath)
    const cachePath = path.resolve(dockerVolume, dirName)

    await ensureDir(cachePath)

    const dirFiles = await readdir(dirPath)
    const cacheFiles = await readdir(cachePath)

    console.log(
      `Found ${cacheFiles.length} cached files for ${dirName} directory with ${dirFiles.length} files.`
    )

    await copy(cachePath, dirPath)
  }

  console.log('Docker volume cache restored')
}

exports.onPostBuild = async function({ store }) {
  if (!process.env.DOCKER_GATSBY_VOLUME) {
    return
  }

  const { dirsToCache, dockerVolume } = await calculateDirs(store)

  for (const dirPath of dirsToCache) {
    const dirName = path.basename(dirPath)
    const cachePath = path.resolve(dockerVolume, dirName)

    const dirFiles = await readdir(dirPath)
    const cacheFiles = await readdir(cachePath)

    console.log(
      `Found ${dirFiles.length} files in ${dirName} directory with ${cacheFiles.length} already cached files.`
    )

    await copy(dirPath, cachePath)
  }

  console.log('Docker volume cache refilled')
}

// exports.sourceNodes = sourceNodes()
