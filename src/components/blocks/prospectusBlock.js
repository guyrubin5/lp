import { React, styled, mq } from 'x'

import GenericBlock from './genericBlock'

export default props => {
  return (
    <GenericBlock { ...props } prospectus={ true } />
  )
}
