import { compose, pure } from 'recompose'
import { React, Image, Link, styled } from 'x'

const Container = styled.div`
  background-color: #eee;
`

const enhance = compose(
  pure
)

const Unknown = props => {
  return (
    <Container>
      UNKNOWN
      <pre style={{textOverflow: 'ellipsis', overflow: 'hidden'}}>
        { JSON.stringify(props.data, 0, 2) }
      </pre>
    </Container>
  )
}


export default enhance(Unknown)
