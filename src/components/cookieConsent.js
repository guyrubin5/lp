import { React, styled, mq }  from 'x'
import { ButtonBlue } from 'components/common'
import { default as Cookies } from 'js-cookie'
import { compose, withState } from 'recompose'

import Arrow from 'static/svg/arrow.svg'

const isBrowser = typeof window !== 'undefined'

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 120px;
  right: 120px;
  border-radius: 5px 5px 0 0;
  background: rgba(255, 255, 255, .9);
  color: black;
  font-size: 14px;
  z-index: 100;
  text-align: center;
  padding: 10px 10px 10px 10px;
  border-top: #e4e4e4;
  display: flex;
  align-items: center;
  justify-content: center;

  ${ mq.below('sm') } {
    left: 0px;
    right: 0px;
    height: 60px;
    padding: 20px;
    background: rgba(255, 255, 255, .95);
  }

  ${ ButtonBlue } {
    margin-left: 20px;
    height: 48px;
    line-height:48px;
  }
`

const enhance = compose(

)

export default enhance(props => {
  if (!isBrowser) return false
  if (Cookies.get('consent') === 'yes') return false

  const giveConsent = () => {
    Cookies.set('consent', 'yes')
    props.changeCookieOverlayShown(false)
  }

  return (
    <Container>
      { props.globalData.cookieText }
      <ButtonBlue as="span" to="#" onClick={ giveConsent }>
        OK
        <Arrow className="circle"/>
      </ButtonBlue>
    </Container>
  )
})
