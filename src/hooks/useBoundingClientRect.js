// TODO: replace with https://github.com/imbhargav5/rooks/pull/104 once pull is accepted

import { useState, useCallback } from "react";
import { useMutationObserver } from "hooks/useMutationObserver";
import { useDidMount } from "hooks/useDidMount";

/**
 * useBoundingclientRect hook
 *
 * @param ref The React ref whose ClientRect is needed
 * @return ClientRect
 */

function getBoundingClientRect(element) {
  return element.getBoundingClientRect();
}

function useBoundingClientRect(ref) {
  const [value, setValue] = useState(null);

  const update = useCallback(() => {
    setValue(ref.current ? getBoundingClientRect(ref.current) : null);
  }, []);

  useDidMount(() => {
    update();
  });

  // Disabled because it fucks up lines as other circles do not update
  // useMutationObserver(ref, update);

  return [value, update];
}

export { useBoundingClientRect };