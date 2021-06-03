import { React, styled } from 'x'
import { Content, H2, H4, ButtonYellow } from 'components/common'

import Arrow from 'static/svg/arrow.svg'
import FourOFour from 'static/svg/fourOFour.svg'

const Container = styled.div`
  padding: 100px 0;
  background-color: #f9f9f9;
  text-align: center;

  ${ H2 } {
    max-width: 500px;
    text-align: center;
    margin: 20px auto;
  }

  ${ H4 } {
    text-align: center;
    text-transform: none;
    font-size: 16px;
  }

  ${ ButtonYellow } {
    margin: 0 auto;
  }
`

const FourOFourContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
`

const Text = styled.div`
  color: ${ props => props.theme.primary };
  font-size: 16px;
  line-height: 24px;
  margin: 30px auto;
  max-width: 800px;
`


export default props => {
  return (
    <Container>
      <Content>
        <FourOFourContainer>
          <FourOFour />
        </FourOFourContainer>
        <H2>
          { props.data.title }
        </H2>
        <H4>
          { props.data.subtitle }
        </H4>
        <Text dangerouslySetInnerHTML={{ __html: props.data.text }} />
        <ButtonYellow to="">
          { props.data.label }
          <Arrow className="circle"/>
        </ButtonYellow>
      </Content>
    </Container>
  )
}
