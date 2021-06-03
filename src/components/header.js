import { withTheme } from 'styled-components'
import { default as Headroom } from 'react-headroom'
import { React, Link, styled, mq } from 'x'
import { compose, pure, lifecycle, withState, withHandlers } from 'recompose'

import Menu from '../components/menu/index.js'

import Logo from 'static/svg/logo.svg'
import Phone from 'static/svg/phone.svg'

// #2A2D58
// flex-direction: column;
// justify-content: center;
// background: linear-gradient(-180deg, rgba(255, 255, 255, .0), rgba(255, 255, 255, .0));

const Darken = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 210px;
  width: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0,0,0,0));

  ${ mq.below('lg') } {
    display: none;
  }

  ${ mq.above('lg') } {
    display: ${ props => props.theme.mode === 'light' || props.hasScrolled ? 'none' : 'block' };
  }
`

const Empty = ({ children, ...props }) => <>{ children }</>

const LearningPeople = styled(Link)`
  display: inline-block;
  position: relative;
  transition: all .15s ease-out;

  &:hover {
    transform: scale(1.05);
  }
`

const HeaderWrapper = styled.header`
  z-index: 5;
  display: flex;

  ${
    props => props.isOffersPage && `
      height: 100px !important;
      position: relative !important;
      ${ LearningPeople } {
        padding: 15px !important;
        & svg {
          height: 70px !important;
          margin-left: 0 !important;
        }
      }
    `
  }

  @media (min-width: 960px) {
    /*
    position: ${ props => props.theme.mode === 'light'
      ? `relative`
      : `absolute`
    };
    */
    position: absolute;
    transition: background .37s;

    top: 0;
    left: 0;
    right: 0;
    height: 142px;
    border-bottom: 1px solid rgba(255, 255, 255, .4);
    box-shadow: 0 5px 11px 0 rgba(0, 0, 0, .05);
    background: ${ props => props.theme.mode === 'light' || props.hasScrolled
      ? `rgba(255, 255, 255, 1)`
      : `rgba(255, 255, 255, .05)`
    };

    ${ LearningPeople } {
      padding: 30px;

      & svg {
        transition: fill .37s;
        width: 137px;
        fill: ${ props => props.theme.mode === 'light' || props.hasScrolled
          ? props.theme.primary
          : `#fff`
        };
      }
    }
  }

  @media (max-width: 960px) {
    ${'' /* position: absolute;
    top: 0;
    left: 0;
    right: 0; */}
    position: fixed;
    width: 100%;
    height: 60px;
    box-shadow: 0 5px 11px 0 rgba(0, 0, 0, .05);
    background: ${ props => props.store.isMenuOpen
      ? props.theme.primary
      : '#fff'
    };

    transition: all .5s;

    ${ LearningPeople } {
      padding: 12px 0px;

      & svg {
        transition: all .15s;
        margin-left: -20px;
        height: 37px;
        fill: ${ props => props.store.isMenuOpen
          ? '#fff'
          : props.theme.primary
        };
      }
    }
  }
`

const RegularLink = styled.a`
  text-decoration: none;
`

const PhoneIcon = styled.div`
  margin-right: 20px;
  height: 40px;
  width: 40px;
  background: ${ props => props.theme.secondary };
  padding: 20px;
  border-radius: 40px;
  @media (max-width: 480px) {
    display: none;
  }
`

const PhoneNumbers = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 0 12px;
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);

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
      color: ${ props => props.theme.primary };
      font-weight: 600;
    }
  }

  ${ mq.below('sm') } {
    & > p {
      font-size: 18px;
    }
  }
`

const enhance = compose(
  withState('hasScrolled', 'changeHasScrolled', false),

  withHandlers({
    updateScroll: props => event => {
      const scrollY = window.scrollY || window.pageYOffset

      if (props.store.isContactShown || props.store.isSearchShown) {
        return
      }
      if (scrollY !== 0 && props.hasScrolled === false) {
        props.changeHasScrolled(true)
      } else if (scrollY === 0 && props.hasScrolled === true) {
        props.changeHasScrolled(false)
      }
    },
  }),
  lifecycle({
    componentDidMount(...args) {
      window.addEventListener('scroll', this.props.updateScroll, false)

      this.listener = {
        event: 'menu',
        callback: () => this.forceUpdate()
      }

      this.props.store.listeners.push(this.listener)
    },

    componentWillUnmount(...args) {
      window.removeEventListener('scroll', this.props.updateScroll, false)

      const index = this.props.store.listeners.indexOf(this.listener)

      this.props.store.listeners.splice(index, 1)
    }
  })
)

const Header = props => {
  const Wrapper = props.isOffersPage || typeof window !== 'undefined' && window.innerWidth < 960
    ? Empty
    : Headroom

  // const shouldUseHeadroom = props.isOffersPage || typeof window !== 'undefined' && window.innerWidth < 960

  return (
    <div className="gta-header">
      <Wrapper
        disabled={ props.store.isContactShown || props.store.isSearchShown }
        style={{
          height: '142px',
          zIndex: 5,
        }}
        wrapperStyle={{
          height: '142px',
          zIndex: 5,
          position: props.theme.mode === 'light' ? 'relative' : 'absolute',
          top: 0,
          left: 0,
          right: 0,
        }}
      >
        <HeaderWrapper
          store={ props.store }
          hasScrolled={ props.hasScrolled }
          isOffersPage={ props.isOffersPage }
        >
          <Darken hasScrolled={ props.hasScrolled } />
          <LearningPeople
            to={ `/${ props.globalData.language.prefix }/` }
            title="LearningPeople"
          >
            <Logo />
          </LearningPeople>
          {
            !props.isOffersPage
              ? <Menu { ...props } />
              : (
                <PhoneNumbers>
                  <PhoneIcon>
                    <Phone />
                  </PhoneIcon>
                  <p>
                    <RegularLink href={ props.globalData.primaryPhoneHref }>
                      { props.globalData.primaryPhoneNumber }
                    </RegularLink>
                    <RegularLink href={ props.globalData.secondaryPhoneHref }>
                      { props.globalData.secondaryPhoneNumber }
                    </RegularLink>
                  </p>
                </PhoneNumbers>
              )
          }
        </HeaderWrapper>
      </Wrapper>
    </div>
  )
}

export default withTheme(enhance(Header))
