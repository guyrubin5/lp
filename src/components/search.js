import { React, styled } from 'x'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { compose, pure, lifecycle, withHandlers, withState } from 'recompose'

import SearchInput from './searchInput'
import SearchResults from './searchResults'

import Close from 'static/svg/close.svg'

const CloseButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 60px;
  height: 60px;
  box-sizing: border-box;
  padding: 20px;
  cursor: pointer;
  fill: ${props => props.theme.primary};
`

const Overlay = styled.div`
  background: linear-gradient(
    0deg,
    ${ props => props.theme.secondaryRGBA(.85) } 0%,
    ${ props => props.theme.secondaryRGBA(1) } 100%
  );

  transition: opacity 0.25s;
  opacity: 0;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 110;


  display: ${ props => props.shown ? 'flex' : 'none' };
  align-items: center;
  justify-content: center;

  &.active {
    opacity: 1;
  }
`

const Wrapper = styled.div`
  position: absolute;
  top: 60px;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  flex-direction: ${ props => props.activeSearchTerm.length
    ? 'column'
    : 'row'
  };
  align-items: ${ props => props.activeSearchTerm.length
    ? 'normal'
    : 'center'
  };
`

const enhance = compose(
  pure,

  withState('searchWrapper', 'setSearchWrapper', null),

  withState('searchInput', 'updateSearchInput', ''),
  withState('activeSearchTerm', 'setActiveSearchTerm', ''),
  withState('searchResults', 'setSearchResults', ''),
  withState('isLoading', 'changeLoading', false),

  withState('isSearchShown', 'changeSearchShown', false),
  withState('isSearchAnimateTriggered', 'changeSearchAnimateTrigger', false),

  withHandlers({
    toggleSearch: props => () => {
      if (props.isSearchShown) {
        enableBodyScroll(props.searchWrapper)
        props.changeSearchAnimateTrigger(false)
        setTimeout(() => {
          props.changeSearchShown(false)
          props.store.isSearchShown = false
        }, 450)
      } else {
        disableBodyScroll(props.searchWrapper)
        props.changeSearchShown(true)
        props.store.isSearchShown = true
        setTimeout(() => {
          props.changeSearchAnimateTrigger(true)
        }, 50)
      }
    },
    keyDown: props => event => {
      if (event.keyCode === 27 && props.isSearchShown) {
        enableBodyScroll(props.searchWrapper)
        props.changeSearchAnimateTrigger(false)
        setTimeout(() => {
          props.changeSearchShown(false)
          props.store.isSearchShown = false
        }, 450)
      }
    }
  }),

  lifecycle({
    componentDidMount(...args) {
      window.toggleSearch = this.props.toggleSearch
      document.addEventListener('keydown', this.props.keyDown, false)
    },

    componentWillUnmount(...args) {
      document.removeEventListener('keydown', this.props.keyDown, false)
    }
  })
)



export default enhance(props => {
  const {
    isSearchShown,
    isSearchAnimateTriggered,
    toggleSearch,
  } = props

  const {
    searchInput,
    updateSearchInput,
  } = props

  const {
    activeSearchTerm,
    setActiveSearchTerm,
    searchResults,
    setSearchResults,
    isLoading,
    changeLoading,
  } = props

  const onSubmit = async event => {
    const inputField = event.target[0]
    event.preventDefault()

    changeLoading(true)
    setActiveSearchTerm(inputField.value)

    const withLangCode = props.globalData.language.code !== 'en' ? `/${ props.globalData.language.code }` : ''
    const apiUrl = `${ props.globalData.baseUrl }${withLangCode}/wp-json/inno/v1/things?search=${ inputField.value }&limit=10`

    const result = await fetch(apiUrl)
      .then(async response => await response.json())

    changeLoading(false)
    setSearchResults({
      hubspot: result.hubspot_results.results,
      wordpress: result.wordpress_results.data,
    })
  }

  return (
    <Overlay className={ isSearchAnimateTriggered ? 'active' : '' } shown={ isSearchShown }>
      <CloseButton onClick={ toggleSearch }>
        <Close />
      </CloseButton>
      <Wrapper activeSearchTerm={ activeSearchTerm } ref={ props.setSearchWrapper }>
        {
          isSearchShown
            ? <>
              <SearchInput
                onSubmit={ onSubmit }
                globalData={ props.globalData }
                searchInput={ searchInput }
                activeSearchTerm={ activeSearchTerm }
                updateSearchInput={ updateSearchInput }
              />
              {
                activeSearchTerm.length
                  ? <SearchResults
                      isLoading={ isLoading }
                      globalData={ props.globalData }
                      toggleSearch={ toggleSearch }
                      searchResults={ searchResults }
                    />
                  : null
              }
            </>
          : null
      }
      </Wrapper>
    </Overlay>
  )
})
