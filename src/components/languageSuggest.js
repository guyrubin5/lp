import { React, styled } from 'x'
import { compose, lifecycle } from 'recompose'

const LanguageSuggest = styled.div`
  position: absolute;
  top: -100px;
  left: 0;
  right: 0;
  height: 100px;
  background: rebeccapurple;
`

const enhance = compose(
  lifecycle({
    componentDidMount() {
      document.documentElement.style.position = 'absolute'
      document.documentElement.style.top = '100px'
    }
  })
)


export default enhance(props => {


  return (
    <LanguageSuggest />
  )
})
