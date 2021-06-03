import { keyframes } from 'styled-components'
import { React, styled, Link } from 'x'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { compose, pure, lifecycle, withHandlers, withState } from 'recompose'

import PhoneIcon from 'static/svg/phone.svg'
import ArrowIcon from 'static/svg/dropdown.svg'
import SearchIcon from 'static/svg/search.svg'
import HamburgerIcon from 'static/svg/hamburger.svg'
import CloseIcon from 'static/svg/close.svg'

const Phone = compose(pure)(PhoneIcon)
const Arrow = compose(pure)(ArrowIcon)
const Search = compose(pure)(SearchIcon)
const Hamburger = compose(pure)(HamburgerIcon)
const Close = compose(pure)(CloseIcon)

const mapToIcon = icon => do {
  if (icon === 'phone') Phone
  else if (icon === 'search') Search
}

const RegularLink = styled.a`
  text-decoration: none;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  text-transform: uppercase;
  font-weight: normal;
  font-size: 15px;
`

const PrimaryLink = styled(StyledLink)`
  background-color: ${props => props.theme.secondary};
  color: #fff;
  fill: #fff;
  transition: all 0.15s ease-in-out;

  &:hover {
    color: ${props => props.theme.primary} !important;
    background-color: #f3c378;
  }
`

const SecondaryLink = styled(StyledLink)`
  background-color: #f2f2f2;
`

const StyledArrow = styled(Arrow)``

const HamburgerContainer = styled.div`
  @media (min-width: 960px) {
    display: none;
  }

  @media (max-width: 960px) {
    position: absolute;
    right: 10px;
    top: 10px;
    padding: 10px 10px 10px 15px;
  }

  > svg path {
    fill: ${props => (props.isMenuOpen ? '#fff' : props.theme.primary)};
  }
`

const PhoneContainer = styled.div`
  @media (min-width: 960px) {
    display: none;
  }

  @media (max-width: 960px) {
    position: absolute;
    right: 65px;
    top: 8px;
    padding: 10px 20px 10px 10px;
    border-right: 1px solid
      ${props =>
        props.isMenuOpen
          ? 'rgba(255, 255, 255, .1)'
          : props.theme.primaryRGBA(0.1)};
  }

  > svg path {
    fill: ${props => (props.isMenuOpen ? '#fff' : props.theme.primary)};
  }
`

const PhoneDropdown = styled.div`
  position: absolute;
  top: 52px;
  right: 0;
  width: 200px;
  background: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 11px 0 rgba(0,0,0,.15);

  & ${RegularLink} {
    color: ${props => props.theme.primary};
    font-size: 20px;
    line-height: 34px;
    display: block;
    text-align: center;
  }
}
`

const SearchContainer = styled.div`
  @media (min-width: 960px) {
    display: none;
  }

  @media (max-width: 960px) {
    position: absolute;
    right: 121px;
    top: 7px;
    padding: 10px;
  }

  > svg path {
    fill: ${props => (props.isMenuOpen ? '#fff' : props.theme.primary)};
  }
`

const shake = keyframes`
  10%, 90% {
    transform: translate3d(-1px, 0, 0) rotate(-5deg);
  }

  20%, 80% {
    transform: translate3d(2px, 0, 0) rotate(10deg);
  }

  30%, 50%, 70% {
    transform: translate3d(-3px, 0, 0) rotate(-15deg);
  }

  40%, 60% {
    transform: translate3d(3px, 0, 0) rotate(15deg);
  }
`

const PhoneNumbers = styled.li`
  display: inline-flex;
  background: #f5f5f3;
  align-items: center;
  padding: 0 12px;

  & > svg {
    margin-right: 10px;
  }

  & > p {
    display: inline-flex;
    flex-direction: column;
    margin: 0;

    & > a {
      color: ${props => props.theme.primary};
      font-weight: normal;
    }
  }

  &:hover {
    & > svg {
      animation: ${shake} 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
      perspective: 1000px;
    }
  }
`

const SearchButton = styled.li`
  width: 60px;
  display: inline-flex;
  justify-content: center;

  & > a > span {
    display: none;
  }

  & > a > svg {
    transition: transform 0.15s ease-in-out;
    width: 23px;
    fill: ${props => props.theme.primary};
  }

  &:hover {
    & > a > svg {
      transform: scale(1.2);
    }
  }
`

const SearchInner = styled.i``

const RootItem = compose(pure)(({ item, closeMenu }) => {
  const Icon = item.icon ? mapToIcon(item.icon) : null

  const Outer = item.primary
    ? PrimaryLink
    : item.secondary
    ? SecondaryLink
    : StyledLink

  return (
    <li>
      <Outer to={item.url} onClick={closeMenu}>
        {item.icon ? <Icon /> : item.title}
      </Outer>
    </li>
  )
})

const SubItem = ({ item, closeMenu }) => (
  <li>
    <Link to={item.url} onClick={closeMenu}>
      {item.title}
    </Link>
  </li>
)

const Column = compose(pure)(({ item, closeMenu }) => (
  <ul>
    <li>
      <Link onClick={closeMenu} to={item.url}>
        {item.title}
      </Link>
      <ul>
        {item?.items?.map(item => (
          <SubItem key={item.id} item={item} closeMenu={closeMenu} />
        ))}
      </ul>
    </li>
  </ul>
))

const Overlay = styled.div`
  display: ${props => (props.isMenuOpen ? 'block' : 'nonde')};

  @media (max-width: 960px) {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 6;
  }
`

const Container = styled.div`
  & ${StyledArrow} {
    margin-left: 10px;
    fill: ${props =>
      props.theme.mode === 'light' || props.hasScrolled
        ? props.theme.primary
        : '#fff'};
  }

  ${StyledLink} {
    color: ${props =>
      props.theme.mode === 'light' || props.hasScrolled
        ? props.theme.primary
        : '#fff'};

    fill: ${props =>
      props.theme.mode === 'light' || props.hasScrolled
        ? props.theme.primary
        : '#fff'};

    &:hover {
      color: ${props =>
        props.theme.mode === 'light' || props.hasScrolled
          ? props.theme.primaryRGBA(0.5)
          : props.theme.primary} !important;
    }
  }

  @media (min-width: 960px) {
    & > div > ul {
      flex-direction: row;
    }

    & > div > ul > li:hover {
      background: #fff;
      color: #34365F;

      & > a {
        color: #34365F;
        fill: #34365F;
      }
    }

    & > div > ul > li:focus-within {
      background: #fff;
      color: #34365F;

      & > a {
        color: #34365F;
        fill: #34365F;
      }
    }

    & > div > ul > li:hover > ${StyledArrow} {
      transform: rotate(180deg);
      fill: #34365F;
    }

    & > div > ul > li:focus-within > ${StyledArrow} {
      transform: rotate(180deg);
      fill: #34365F;
    }

    & > div > ul > li:hover > div,
    & > div > ul > li > div:hover,
    & > div > ul > li > div:focus {
      visibility: visible;
      opacity: 1;
      display: flex;
    }

    & > div > ul > li:focus-within > div {
      visibility: visible;
      opacity: 1;
      display: flex;
    }

    & > div > ul {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
    }

    & > div > ul > li > a {
      display: inline-flex;
      align-items: center;
      padding: 0px 10px;
    }

    & > div > ul > li > ${StyledArrow} {
      margin: 0px 10px 2px -5px;
    }

    & > div > ul > li {
      /*
      perspective: 800px;
      perspective-origin: 50% 00%;
      transform-style: preserve-3d;
      */
    }

    & > div > ul > li > div {
      transition: opacity .3s ease-out;
      position: absolute;
      opacity: 0;
      height: 0;
      overflow: hidden;

      /*
      transform-origin: top center;
      perspective-origin: 50% 0%;
      transform-style: preserve-3d;
      transform: rotateX(-17deg);
      */
    }

    & > div > ul > li:hover {
      overflow: visible;
    }

    & > div > ul > li:focus-within {
      overflow: visible;
    }

    & > div > ul > li:hover > div {
      opacity: 1;
      height: auto;
    }

    & > div > ul > li:focus-within > div {
      opacity: 1;
      height: auto;
    }

    & > div > ul > li.megaMenu > div,
    & > div > ul > li.dropdownMenu > div {
      box-shadow: 0 5px 6px 3px rgba(0, 0, 0, .12);
    }

    & > div > ul > li.megaMenu > div {
      width: 960px;

      @media (min-width: 1200px) {
        width: 1100px;
      }
      @media (min-width: 1400px) {
        width: 1300px;
      }
      @media (min-width: 1600px) {
        width: 1500px;
      }
    }

    & > div > ul > li.megaMenu > div > div > ul {
      padding: 0;
      list-style: none;

      & > li {
        & > a {
          color: ${props => props.theme.secondary};
          font-size: 15px;
          text-transform: uppercase;
          font-weight: normal;
          &:hover {
            color: #cd945b;
          }
        }

        & > ul {
          padding: 5px 0 15px 0;
          list-style: none;

          & > li {
            padding: 4px 0;
          }

          & > li > a {
            color: #34365F;
            &:hover {
              color: ${props => props.theme.primaryRGBA(0.5)};
            }
          }
        }
      }
    }

    & > div > ul > li.dropdownMenu > div > div > ul {
      padding: 0;
      list-style: none;

      & > li {
        padding: 4px 0;

        & > a {
          color: #34365F;
          font-size: 15px;
          &:hover {
            color: ${props => props.theme.primaryRGBA(0.5)};
          }
        }
      }
    }

    & > div > ul > li.dropdownMenu > div > .col-1,
    & > div > ul > li.dropdownMenu > div > .col-2 {
      display: inline-flex;
      flex-direction: column;
      align-items: stretch;
      width: 200px;

      & > ul {
        display: block;
      }
    }

    & > div > ul > li.megaMenu > div > .col-1,
    & > div > ul > li.megaMenu > div > .col-2,
    & > div > ul > li.megaMenu > div > .col-3,
    & > div > ul > li.megaMenu > div > .col-4 {
      width: 25%;
      box-sizing: border-box;
      padding: 40px 40px;
    }

    & > div > ul > li.megaMenu > div > .col-1,
    & > div > ul > li.megaMenu > div > .col-3,
    & > div > ul > li.dropdownMenu > div > .col-1 {
      background: #fff;
    }

    & > div > ul > li.megaMenu > div > .col-2,
    & > div > ul > li.megaMenu > div > .col-4,
    & > div > ul > li.dropdownMenu > div > .col-2 {
      background: #FAFAFA;
    }

  }

  @media (max-width: 960px) {
    position: fixed;
    z-index: 7;
    top: 60px;
    bottom: 0;
    left: 0;
    width: 300px;
    background: #fff;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    padding-top: 15px;
    transition: transform .2s;
    transform: translateX(0);

    box-shadow: ${props =>
      props.isMenuOpen ? '5px 0 30px rgba(0,0,0,.1);' : 'none;'}

    transform: ${props =>
      props.isMenuOpen ? 'translateX(0px);' : 'translateX(-300px);'}

    & ${StyledLink}, ${SecondaryLink} {
      color: ${props => props.theme.primary};
      font-size: 18px;
      font-weight: 600;
      padding: 5px;
      text-transform: none;
      margin-right: auto;
      background: none;
    }

    & ${PrimaryLink} {
      display: flex;
      padding: 15px 10px;
      border-radius: 3px;
      font-size: 18px;
      font-weight: 600;
    }

    & ${SearchButton} {
      display: block;
      box-sizing: border-box;
      width: 100%;

      & > a {
        display: block;
        position: relative;

        & > span {
          display: inline-block;
        }

        & > svg {
          position: absolute;
          width: 20px;
          height: 20px;
          right: 5px;
          top: 0px;
        }
      }
    }

    ${PhoneNumbers} {
      display: flex;
      flex-direction: row-reverse;
      font-size: 18px;
      background: #fff;
      & > p {
        line-height: 30px;
        margin-right: auto;
        padding-left: 5px;
        & > a {
          font-weight: 600;
        }
      }

      & > svg {
        margin-right: 5px;
        width: 20px;
        height: 20px;
      }
    }
    /*
      display: inline-flex;
      background: #F5F5F3;
      align-items: center;
      padding: 0 12px;

      & > svg {
        margin-right: 10px;
      }

      & > p {
        display: inline-flex;
        flex-direction: column;
        margin: 0;

        & > a {
          color: ${props => props.theme.primary};
          font-weight: normal;
        }
      }
    */

    & > div > ul > li {
      position: relative;
      padding: 10px 18px;
      &.dropdownMenu {
        padding-right: 46px;
      }
      &.primaryLink {
        padding: 10px 12px;
        font-size: 17px;
      }
    }

    /*
    & > div > ul > li ul > li:first-child {
      margin-top: 5px;
    }
    */

    & ${StyledArrow} {
      fill: ${props => props.theme.primary};
      width: 18px;
      height: 18px;
      position: absolute;
      right: 15px;
      top: 13px;
    }

    & ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    & > div > ul {
      flex-direction: column;

      & > li > div > div > ul > li {
        //padding-left: 10px;

        & > a {
          display: block;
          color: ${props => props.theme.primary};
          font-size: 15px;
          font-weight: normal;
          padding: 5px;
        }

        & > ul > li {

          & > a {
            display: block;
            color: ${props => props.theme.primary};
            font-size: 15px;
            font-weight: normal;
            padding: 5px;
          }
        }
      }

      & > li.dropdownMenu > div > div:first-child > ul > li:first-child {
        padding-top: 5px;
      }

      & > li.megaMenu > div > div > ul > li {
        padding: 10px 0 10px 0px;

        & > a {
          color: ${props => props.theme.secondary};
          font-size: 15px;
          text-transform: uppercase;
          font-weight: 600;
        }

        & > ul li {
          margin-top: 0;
        }
      }
    }

    & > div > ul > li > div {
      visibility: hidden;
      opacity: 0;
      display: none;
    }

    & > div > ul > li.is-active > div {
      visibility: visible;
      opacity: 1;
      display: block;
    }

    & > div > ul > li.is-active > ${StyledArrow} {
      transform: rotate(180deg);
    }
  }
`

const TopContainer = styled.div`
  @media (min-width: 960px) {
    position: absolute;
    top: 0;
    right: 0;
    height: 60px;

    background: ${props =>
      props.theme.mode === 'light' || props.hasScrolled ? '#E9EAEE' : '#fff'};

    & > ul > li:hover {
      background: ${props =>
        props.theme.mode === 'light' || props.hasScrolled
          ? '#f7f7f7 !important'
          : '#ffffff !important'};
    }

    & > ul > li:focus-within {
      background: ${props =>
        props.theme.mode === 'light' || props.hasScrolled
          ? '#f7f7f7 !important'
          : '#ffffff !important'};
    }

    & ${StyledLink}, ${SecondaryLink} {
      color: ${props => props.theme.primary};
      fill: ${props => props.theme.primary};
      text-transform: none;

      &:hover {
        color: ${props => props.theme.primary} !important;
        fill: ${props => props.theme.primary} !important;
      }
    }

    & ${StyledArrow} {
      fill: ${props => props.theme.primary};
    }

    & > ul > li {
      position: relative;
    }

    & > ul > li > a {
      height: 60px;
      line-height: 60px;
      padding: 0 15px !important;
    }

    & > ul > li > div {
      right: 0;
      width: 480px;
    }

    & > ul > li.dropdownMenu > div > .col-1,
    & > ul > li.dropdownMenu > div > .col-2 {
      padding: 40px 40px;
    }
  }

  @media (max-width: 960px) {
  }
`

const SecondaryContainer = styled.div`
  @media (min-width: 960px) {
    position: absolute;
    bottom: 0;
    right: 20px;
    height: 60px;

    & > ul > li > a {
      height: 60px;
      line-height: 60px;
    }
  }

  @media (max-width: 960px) {
  }
`

const PrimaryContainer = styled.div`
  @media (min-width: 960px) {
    position: absolute;
    bottom: 0;
    left: 207px;
    height: 60px;

    & > ul > li > a {
      height: 60px;
      line-height: 60px;
    }

    & > ul > li > div {
      left: ${-220 + 90}px;
      width: 960px;
    }

    & > ul > li.dropdownMenu > div > .col-1,
    & > ul > li.dropdownMenu > div > .col-2 {
      padding: 40px 140px;
    }
  }

  @media (max-width: 960px) {
  }
`

const DropdownMenu = compose(
  pure,
  withState('isActive', 'changeActive', false)
)(({ item, isActive, changeActive, closeMenu }) => {
  const toggleActive = event => {
    changeActive(!isActive)
  }

  const cols = item.items.reduce(
    (result, item, index, items) => {
      return result[index < items.length / 2 ? 0 : 1].push(item), result
    },
    [[], []]
  )

  return (
    <li className={'dropdownMenu' + (isActive ? ' is-active' : '')}>
      <StyledLink to={item.url} onClick={closeMenu}>
        {item.title}
      </StyledLink>
      <StyledArrow onClick={toggleActive} />
      <div>
        <div className="col-1">
          <ul>
            {cols[0].map(item => (
              <SubItem key={item.id} item={item} closeMenu={closeMenu} />
            ))}
          </ul>
        </div>
        <div className="col-2">
          <ul>
            {cols[1].map(item => (
              <SubItem key={item.id} item={item} closeMenu={closeMenu} />
            ))}
          </ul>
        </div>
      </div>
    </li>
  )
})

const MegaMenu = compose(
  pure,
  withState('isActive', 'changeActive', false)
)(({ item, isActive, changeActive, closeMenu }) => {
  const toggleActive = event => {
    changeActive(!isActive)
  }

  const cols = item.items.reduce(
    (result, item, index) => {
      return result[index % 4].push(item), result
    },
    [[], [], [], []]
  )

  return (
    <li className={'megaMenu' + (isActive ? ' is-active' : '')}>
      <StyledLink to={item.url} onClick={closeMenu}>
        {item.title}
      </StyledLink>
      <StyledArrow onClick={toggleActive} />
      <div>
        <div className="col-1">
          {cols[0].map(item => (
            <Column key={item.id} item={item} closeMenu={closeMenu} />
          ))}
        </div>
        <div className="col-2">
          {cols[1].map(item => (
            <Column key={item.id} item={item} closeMenu={closeMenu} />
          ))}
        </div>
        <div className="col-3">
          {cols[2].map(item => (
            <Column key={item.id} item={item} closeMenu={closeMenu} />
          ))}
        </div>
        <div className="col-4">
          {cols[3].map(item => (
            <Column key={item.id} item={item} closeMenu={closeMenu} />
          ))}
        </div>
        <div style={{ clear: 'both' }} />
      </div>
    </li>
  )
})

const PrimaryMenu = compose(pure)(({ menu, closeMenu }) => (
  <PrimaryContainer>
    <ul className="primary">
      {menu?.items.map(item =>
        item.megaMenu ? (
          <MegaMenu key={item.id} item={item} closeMenu={closeMenu} />
        ) : item.items && item.items.length ? (
          <DropdownMenu key={item.id} item={item} closeMenu={closeMenu} />
        ) : (
          <RootItem key={item.id} item={item} closeMenu={closeMenu} />
        )
      )}
    </ul>
  </PrimaryContainer>
))

const SecondaryMenu = compose(pure)(({ menu, closeMenu }) => (
  <SecondaryContainer>
    <ul className="secondary">
      {menu?.items.map(item =>
        item.items && item.items.length ? (
          <DropdownMenu key={item.id} item={item} closeMenu={closeMenu} />
        ) : (
          <RootItem key={item.id} item={item} closeMenu={closeMenu} />
        )
      )}
    </ul>
  </SecondaryContainer>
))

const TopMenu = ({
  menu,
  toggleMenu,
  isMenuOpen,
  globalData,
  hasScrolled,
  openSearch,
  closeMenu
}) => (
  <TopContainer hasScrolled={hasScrolled}>
    <ul className="top">
      {menu?.items.map(item =>
        item.items && item.items.length ? (
          <DropdownMenu key={item.id} item={item} closeMenu={closeMenu} />
        ) : (
          <RootItem key={item.id} item={item} closeMenu={closeMenu} />
        )
      )}
      <li className="primaryLink">
        <PrimaryLink
          as="a"
          style={{
            cursor: 'pointer'
          }}
          onClick={e => (
            e.preventDefault(),
            isMenuOpen && toggleMenu(false),
            window.toggleContactForm()
          )}
        >
          {globalData.stringGetInTouch}
        </PrimaryLink>
      </li>
      <PhoneNumbers>
        <Phone />
        <p>
          <RegularLink href={globalData.primaryPhoneHref}>
            {globalData.primaryPhoneNumber}
          </RegularLink>
          <RegularLink href={globalData.secondaryPhoneHref}>
            {globalData.secondaryPhoneNumber}
          </RegularLink>
        </p>
      </PhoneNumbers>
      <SearchButton>
        <StyledLink
          as="a"
          id={ 'open-search' }
          onClick={openSearch}
          style={{
            cursor: 'pointer'
          }}
        >
          <span>{globalData.stringSearch}</span>
          <Search />
        </StyledLink>
      </SearchButton>
    </ul>
  </TopContainer>
)

const MenuToggle = compose(pure)(({ isMenuOpen, toggleMenu }) => (
  <HamburgerContainer
    isMenuOpen={isMenuOpen}
    onClick={e => (e.preventDefault(), toggleMenu())}
  >
    {isMenuOpen ? <Close width={20} style={{ fill: '#fff' }} /> : <Hamburger />}
  </HamburgerContainer>
))

const enhance = compose(
  pure,
  withState('container', 'setContainer', null),
  withState('isMenuOpen', 'changeMenu', false),
  withState('isPhoneOpen', 'changePhoneOpen', false),
  withHandlers({
    closeMenu: props => () => {
      enableBodyScroll(props.container)
      props.changeMenu(false)
      props.store.isMenuOpen = false

      props.store.listeners.forEach(listener => {
        listener.callback()
      })
    },

    togglePhoneDropdown: props => () => {
      if (props.isPhoneOpen) {
        props.changePhoneOpen(false)
      } else {
        props.changePhoneOpen(true)
      }
    },

    toggleMenu: props => () => {
      if (props.isMenuOpen) {
        enableBodyScroll(props.container)
        props.changeMenu(false)
        props.store.isMenuOpen = false
      } else {
        disableBodyScroll(props.container)
        props.changeMenu(true)
        props.store.isMenuOpen = true
      }

      props.store.listeners.forEach(listener => {
        listener.callback()
      })
    }
  }),
  withHandlers({
    openSearch: props => e => {
      e.preventDefault()
      props.isMenuOpen && props.toggleMenu(false)
      window.toggleSearch()
    }
  })
)

export default enhance(
  ({
    data,
    isMenuOpen,
    globalData,
    toggleMenu,
    hasScrolled,
    setContainer,
    openSearch,
    closeMenu,
    isPhoneOpen,
    togglePhoneDropdown
  }) => {
    return (
      <>
        <MenuToggle isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
        <PhoneContainer isMenuOpen={isMenuOpen}>
          <Phone width={25} onClick={togglePhoneDropdown} />
          {isPhoneOpen && (
            <PhoneDropdown>
              <RegularLink href={globalData.primaryPhoneHref}>
                {globalData.primaryPhoneNumber}
              </RegularLink>
              <RegularLink href={globalData.secondaryPhoneHref}>
                {globalData.secondaryPhoneNumber}
              </RegularLink>
            </PhoneDropdown>
          )}
        </PhoneContainer>
        <SearchContainer onClick={openSearch} isMenuOpen={isMenuOpen}>
          <Search width={25} />
        </SearchContainer>
        {typeof window !== 'undefined' &&
          window.innerWidth < 960 &&
          isMenuOpen && (
            <Overlay onClick={toggleMenu} isMenuOpen={isMenuOpen} />
          )}
        <Container
          ref={setContainer}
          isMenuOpen={isMenuOpen}
          hasScrolled={hasScrolled}
        >
          <PrimaryMenu menu={data.primary} closeMenu={closeMenu} />
          <SecondaryMenu menu={data.secondary} closeMenu={closeMenu} />
          <TopMenu
            menu={data.top}
            globalData={globalData}
            isMenuOpen={isMenuOpen}
            toggleMenu={toggleMenu}
            hasScrolled={hasScrolled}
            openSearch={openSearch}
            closeMenu={closeMenu}
          />
        </Container>
      </>
    )
  }
)
