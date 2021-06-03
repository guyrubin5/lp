import { compose } from 'recompose'
import { React, Link, styled } from 'x'

const CurrentPage = styled.span`
  color: ${props => props.theme.primary};
  font-size: 16px;
`

const StyledBracket = styled.span`
  color: ${ props => props.theme.primary };
  font-size: 16px;
  opacity: .5;
  display: inline-block;
  margin: 0 10px;
  font-weight: bold;
`

const StyledLink = styled(Link)`
  color: ${ props => props.theme.primary };
  font-size: 16px;
  opacity: .5;
`

const Breadcrumbs = styled.div`
  padding: 5px;
`

export default props => {
  return (
    <Breadcrumbs>
      <StyledLink to="#">
        One
      </StyledLink>
      <StyledBracket>
        &#10095;
      </StyledBracket>
      <StyledLink to="#">
        Two
      </StyledLink>
      <StyledBracket>
        &#10095;
      </StyledBracket>
      <CurrentPage>
        Here
      </CurrentPage>
    </Breadcrumbs>
  )
}
