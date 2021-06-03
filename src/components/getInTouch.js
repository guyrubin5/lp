import { H2, ButtonYellow } from 'components/common'
import { default as Form } from 'components/form'
import { React, styled, mq } from 'x'
import { default as Cookies } from 'js-cookie'
import { compose, pure, lifecycle, withHandlers, withState } from 'recompose'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { keyframes } from 'styled-components'

import Contact from 'static/svg/contact_icon_white.svg'
import Close from 'static/svg/close.svg'
import Phone from 'static/svg/phone.svg'
import Arrow from 'static/svg/arrow.svg'

const Container = styled.div``

const Overlay = styled.div`
  background: #000;
  transition: opacity 0.25s;
  opacity: ${props => (props.animate ? '.47' : '0')};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
`

const Popup = styled.div`
  display: ${props => (props.show ? 'block' : 'none')};
  overflow: hidden;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 100;
`

const Circle = styled.div`
  background: ${props => props.theme.secondary};
  width: ${props => props.size};
  padding-bottom: ${props => props.size};
  position: fixed;
  bottom: 59px;
  right: 59px;
  border-radius: 200%;
  margin-right: ${props => props.margin};
  margin-bottom: ${props => props.margin};
  transform: scale(${props => (props.animate ? '1' : '0')});
  transform-origin: center;
  transition: transform 0.5s ease-in-out ${props => !props.animate && '0.1s'};
  z-index: 100;
`

const FormWrapper = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  max-width: 70%;
  padding: 0 100px 100px 0;
  box-sizing: border-box;
  z-index: 101;
  opacity: ${props => (props.animate ? '1' : '0')};
  transition: opacity ${props => (props.animate ? '0.3s' : '0.2s')} ease-in-out
    ${props => props.animate && '0.3s'};

  ${mq.below('sm')} {
    padding: 0 50px 50px 0;
    max-width: 85%;
    top: 0;
  }

  -webkit-overflow-scrolling: touch;
  overflow-y: auto;
  max-height: 100%;

  ${props =>
    props.isSmall &&
    `
    top: 0;
  `}
`

const Title = styled(H2)`
  color: ${props => props.theme.primary};
  font-size: 50px;

  ${mq.below('lg')} {
    line-height: normal;
    font-size: 40px;
  }
  ${mq.below('md')} {
    line-height: normal;
    font-size: 38px;
  }
  ${mq.below('sm')} {
    line-height: normal;
    font-size: 34px;
  }
`

const remove = keyframes`
  from {
    width: 0px;
  }

  to {
    width: 200px;
  }
`

const EnquireNow = styled.div`
  ${ mq.below('md') } {
    display: none;
  }

  position: absolute;
  right: 64px;
  bottom: calc(7px);
  z-index: 1;
  text-transform: uppercase;
  transition:
  opacity .37s ease-out, transform .37s ease-out, right .3699s ${
    p => p.isOpen
      ? 'step-end'
      : 'step-start'
  };

  ${'' /* transition-delay: 5s, ,5s, 5s; */}
  ${'' /* transition-delay: .01s, 0s, .001s; */}

  transition-delay: ${ p => p.isOpen
    ? '.0s, 0s, .001s'
    : '0.01s, 0s, .0s'
  };

  opacity: ${p=>p.isOpen ? '0.0' : '1'};

  right: 25px;

  ${'' /* right: ${p=>p.isOpen ? '0px' : '55px'}; */}

  ${p=>p.isOpen ? 'right: -1000px;' : '' }
  ${p=>p.isOpen ? 'transform: translateX(60px);' : '' }
  ${'' /* ${p=>p.isOpen ? 'width: 0px;' : 'width: auto;' } */}

  ${'' /* box-shadow: 0px 2px 0px 0 rgba(0, 0, 0, 0.3); */}

  ${'' /* animation: ${remove} 0.82s cubic-bezier(0, 0.07, 0.19, 1) both; */}

  ${p=>p.isOpen
    ? ''
    :  ''
  }

  ${'' /* overflow: hidden; */}

  & > div {
    ${'' /* background: #2a2d58 !important; */}
    color: ${ props => props.theme.primary } !important;
    border-radius: 8px 0 0 8px;
    height: 55px;
    line-height: 55px;

    box-shadow: 0px 2px 0px 0 rgba(0, 0, 0, 0.13);

    padding-right: 65px;
    padding-left: 26px;

    transition: background-color 0.15s ease-in-out, transform 0.15s ease-in-out,
      box-shadow 0.15s ease-in-out;

  }

  & > div > svg {
    right: 24px !important;
    opacity: 0.1;
  }
`

const Icon = styled.div`
  height: 70px;
  width: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 35px;
  z-index: 2;
  position: relative;
  background-color: ${props =>
  props.isOpen ? props.theme.primary : props.theme.secondary};
  transition: background-color 0.15s ease-in-out, transform 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;

  box-shadow:
    0px 2px 0px 0 rgba(0, 0, 0, 0.17)
    ${'' /* 0px 0px 50px 30px rgba(255, 255, 255, 0.17), */}
    ${'' /* 0px 0px 0px 2px rgba(255, 255, 255, .0) */}
    ${'' /* ${ props => props.theme.primary } */}
  ;
  transform-origin: 35px 35px;

    & svg {
      ${'' /* transform: translateX(3px); */}
    }
`

const Bubble = styled.div`
  cursor: pointer;

  position: fixed;
  right: 24px;
  z-index: 101;
  bottom: 24px;

  ${props => (props.isCookieOverlayShown ? 'bottom: 73px;' : '')};

  ${mq.below('lg')} {
  ${props => (props.isCookieOverlayShown ? 'bottom: 80px;' : '')};
  }

  ${mq.below('sm')} {
  ${props => (props.isCookieOverlayShown ? 'bottom: 100px;' : '')};
  }

  ${ Icon } {
  }

  &:hover {
    ${ Icon } {
      transform: scale(1.1) translateY(0px) translateX(0px);

      background-color: ${props => props.isOpen
        ? props.theme.secondary
        : props.theme.primary
      };

      ${'' /*
      box-shadow:2px 7px 5px 0 rgba(0, 0, 0, 0.17);
    */}
      box-shadow:
        0px 2px 0px 0 rgba(0, 0, 0, 0.17),
        0px 0px 0px 5px ${ props => props.theme.secondary }
        ${'' /* 0px 0px 50px 30px rgba(255, 255, 255, 0.17), */}
        ${'' /* 0px 0px 0px 2px rgba(255, 255, 255, .99) */}
      ;
    }

    ${ EnquireNow } {
      & > div {
        background: ${ props => props.theme.secondary };
        ${'' /* background: #f3c378; */}
        transform: translateX(-10px);

        & svg {
          transform: translateX(5px);
          opacity: 1;
          fill: red;
        }

        ${'' /* color: #fff; */}
        ${'' /* box-shadow: -2px 7px 5px 0 rgba(0, 0, 0, 0.17); */}

        ${'' /* background-color: ${props => props.isOpen
          ? props.theme.secondary
          : props.theme.primary
          // '#F3C378'
        }; */}
      }
    }


    & svg {
      ${'' /* transform: scale(1.1) translateY(-3px); */}
    }
  }
`

const RegularLink = styled.a`
  text-decoration: none;
  font-size: 26px;

  ${mq.below('md')} {
    font-size: 24px;
  }

  ${mq.below('sm')} {
    font-size: 22px;
  }
`

const PhoneIcon = styled.div`
  margin-right: 30px;
  height: 40px;
  width: 40px;
  background: ${props => props.theme.secondary};
  padding: 40px 0;
  border-radius: 40px;

  ${mq.below('md')} {
    height: 35px;
    width: 35px;
    margin-right: 15px;
    padding: 15px;
    border-radius: 35px;
  }

  ${mq.below('sm')} {
    display: none;
    height: 30px;
    width: 30px;
    margin-right: 10px;
    padding: 10px;
    border-radius: 30px;
  }
`

const PhoneNumbers = styled.div`
  display: inline-flex;
  align-items: center;
  transform: translateY(-50%);
  margin-top: 70px;

  & > div > svg {
    width: 100%;
    height: 100%;
  }

  & > p {
    display: inline-flex;
    flex-direction: column;
    margin: 0;
    font-size: 28px;
    line-height: 36px;

    & > a {
      color: ${props => props.theme.primary};
      font-weight: 600;
    }
  }
`

const enhance = compose(
  pure,

  withState('formWrapper', 'setFormWrapper', null),

  withState('isContactShown', 'changeContactShown', false),
  withState('isContactAnimateTriggered', 'changeContactAnimateTrigger', false),

  withHandlers({
    toggleContactForm: props => () => {
      if (props.isContactShown) {
        enableBodyScroll(props.formWrapper)
        props.changeContactAnimateTrigger(false)
        setTimeout(() => {
          props.changeContactShown(false)
          props.store.isContactShown = false
        }, 550)
      } else {
        disableBodyScroll(props.formWrapper)
        props.changeContactShown(true)
        props.store.isContactShown = true
        setTimeout(() => {
          props.changeContactAnimateTrigger(true)
        }, 50)
      }
    }
  }),

  withHandlers({
    keyDown: props => event => {
      if (event.keyCode === 27 && props.isContactShown) {
        enableBodyScroll(props.formWrapper)
        props.changeContactAnimateTrigger(false)
        setTimeout(() => {
          props.changeContactShown(false)
          props.store.isContactShown = false
        }, 550)
      }
    }
  }),

  lifecycle({
    componentDidMount(...args) {
      window.toggleContactForm = this.props.toggleContactForm
      document.addEventListener('keydown', this.props.keyDown, false)

      this.listener = {
        event: 'menu',
        callback: () => this.forceUpdate()
      }

      this.props.store.listeners.push(this.listener)
    },

    componentWillUnmount(...args) {
      document.removeEventListener('keydown', this.props.keyDown, false)

      const index = this.props.store.listeners.indexOf(this.listener)

      this.props.store.listeners.splice(index, 1)
    }
  })
)

const GetInTouch = props => {
  let size = '200%'
  let margin = '-100%'
  let isSmall = false

  if (typeof window !== 'undefined' && window.innerWidth > window.innerHeight) {
    size = window.innerWidth * 2 + 'px'
    margin = window.innerWidth * -1 + 'px'
  } else if (typeof window !== 'undefined') {
    size = window.innerHeight * 2 + 'px'
    margin = window.innerHeight * -1 + 'px'
  }

  if (typeof window !== 'undefined' && window.innerWidth < 960) {
    isSmall = true
    if (window.innerWidth > window.innerHeight) {
      size = window.innerWidth * 4 + 'px'
      margin = window.innerWidth * -2 + 'px'
    } else {
      size = window.innerHeight * 4 + 'px'
      margin = window.innerHeight * -2 + 'px'
    }
  }

  const {
    isContactShown: show,
    isContactAnimateTriggered: animate,
    toggleContactForm
  } = props

  const className = !show
    ? 'open-contact-bubble'
    : 'close-contact-bubble'

  const bubbleHasLabel =
    props.isOffersPage
      ? !isSmall
      : true

  return (
    <Container>
      <Popup show={show}>
        {show ? (
          <Overlay animate={animate} onClick={toggleContactForm} />
        ) : (
          false
        )}
        <Circle animate={animate} size={size} margin={margin} />
        <FormWrapper
          animate={animate}
          isSmall={isSmall}
          ref={props.setFormWrapper}
        >
          <Title>{props.globalData.contactPopupTitle}</Title>
          <Form
            globalData={props.globalData}
            isShown={show}
            post={props.post}
            formType={ 'bubble' }
          />
        </FormWrapper>
      </Popup>
      {!props.store.isMenuOpen ? (
        <>
          <Bubble
            onClick={toggleContactForm}
            show={show}
            isOpen={show}
            isCookieOverlayShown={props.isCookieOverlayShown}
            className={ className }
          >
            <EnquireNow isOpen={ show } isOffersPage={ props.isOffersPage }>
              <ButtonYellow as={ 'div' }>
                Enquire Now
                {/* <Arrow /> */}
              </ButtonYellow>
            </EnquireNow>
            <Icon isOpen={ show }>
              {!show && <Contact className={className} width={30} />}
              {show && <Close className={className} width={25} fill="#fff" />}
            </Icon>
          </Bubble>
        </>
      ) : (
        false
      )}
    </Container>
  )
}

export default enhance(GetInTouch)
