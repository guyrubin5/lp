import { React } from 'x'
import { compose, pure } from 'recompose'
import { default as styled } from 'styled-components'
import { Link as GatsbyLink } from 'gatsby'


const StyledLink = styled( props => {
  return <GatsbyLink { ...props } />
})`
  text-decoration: none;
`

const StyledA = styled.a`
  text-decoration: none;
`

const enhance = compose(
  pure
)

const Link = ({ children, to, activeClassName = 'active-page', ...other }) => {
  if (to && (to.startsWith('http://') || to.startsWith('https://'))) {
    return (
      <StyledA href={ to } target={ '_blank' } { ...other }>{ children }</StyledA>
    )
  }

  const extra = {}

  if (to === '#get-in-touch' && typeof other.onClick === 'undefined') {
    extra.onClick = event => {
      event.preventDefault()
      typeof window.toggleContactForm && window.toggleContactForm()
    }

    return (
      <StyledA
        activeClassName={ activeClassName }
        { ...other }
        { ...extra }
      >
        { children }
      </StyledA>
    )
  }

  if (to === '#') {
    extra.style = {
      // border: '3px solid red'
    }
  }

  return (
    <StyledLink
      to={ to }
      activeClassName={ activeClassName }
      { ...other }
      { ...extra }
    >
      { children }
    </StyledLink>
  )
}

export default Link
