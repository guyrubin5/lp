import { useEffect, Ref, MutableRefObject } from 'react'

const config = {
  attributes: true,
  characterData: true,
  subtree: true,
  childList: true,
}

/**
 *
 * useMutationObserver hook
 *
 * Returns a mutation observer for a React Ref and fires a callback
 *
 * @param {MutableRefObject<HTMLElement | null>} ref React ref on which mutations are to be observed
 * @param {MutationCallback} callback Function that needs to be fired on mutation
 * @param {MutationObserverInit} options
 */
function useMutationObserver(
  ref,
  callback,
  options = config,
) {
  useEffect(() => {
    // Create an observer instance linked to the callback function
    if (ref.current) {
      const observer = new MutationObserver(callback)

      // Start observing the target node for configured mutations
      observer.observe(ref.current, options)
      return () => {
        observer.disconnect()
      }
    }
  }, [ref.current, callback, options])
}

export { useMutationObserver }

