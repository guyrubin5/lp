import { React, styled } from 'x'
import { Button } from 'components/common'

import Arrow from 'static/svg/arrow.svg'
import { compose, lifecycle, withState } from 'recompose'

const AnimatedButton = styled(Button)`
  & svg {
    transition: transform .3s;
  }
  &:hover {
    & svg {
      transform: translateX(10px);
    }
  }
`

const parseQueryString = qs => {
  let vars = qs.split('&')
  let values = {}
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split('=')
    values[decodeURIComponent(pair[0]).toLowerCase()] = decodeURIComponent(pair[1])
  }
  return values
}

const enhance = compose(
  withState('typeform', 'changeTypeform', `https://learningpeople.typeform.com/to/AS0S6B`),
  lifecycle({
    componentDidMount() {
      let typeform = this.props.typeform
      let qs = parseQueryString(window.location.search.substring(1))
      typeform += `?firstname=${ qs.firstname }`
      typeform += `&lastname=${ qs.lastname }`
      typeform += `&email=${ qs.email }`
      typeform += `&phone=${ qs.phone }`
      this.props.changeTypeform(typeform)
    },
  }),
)

const SurveyButton = enhance(props => (
  <AnimatedButton as="a" href={ props.typeform } target="_blank">
      <span>
        Take a Survey
      </span>
    <Arrow className="circle"/>
  </AnimatedButton>
))

export default SurveyButton