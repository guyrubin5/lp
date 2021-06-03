
export const onClientEntry = async () => {

  if (typeof IntersectionObserver === 'undefined') {
    await import('intersection-observer')
  }

  if (typeof Array.from === 'undefined') {
    await import('array-from-polyfill')
  }

  if (typeof String.prototype.startsWith === 'undefined') {
    await import('string.prototype.startswith')
  }

  if (typeof fetch === 'undefined') {
    await import('whatwg-fetch')
  }

  if (typeof Array.prototype.includes === 'undefined') {
    await import('array-includes')
  }

  if (typeof NodeList.prototype.forEach === 'undefined') {
    await import('nodelist-foreach-polyfill')
  }

}

export const onServiceWorkerUpdateReady = () => {
  console.log('reload on service worker update')
  window.location.reload(true)
}
