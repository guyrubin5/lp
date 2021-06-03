/*
import mediaQueries from 'styled-components-mq';

export default mediaQueries({
  xs: '0px',
  sm: '544px',
  md: '768px',
  lg: '960px',
  xl: '1300px',
})
*/

import { createBreakpoints } from 'styled-breakpoints';

const {
  above,
  below,
  between,
  only,
} = createBreakpoints({
  xs: '0px',
  sm: '544px',
  md: '768px',
  lg: '960px',
  xl: '1366px',
})

export default {
  above,
  below,
  between,
  only,
  createBreakpoints
}
