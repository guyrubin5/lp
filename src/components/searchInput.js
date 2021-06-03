import { ButtonBlue } from 'components/common'
import { React, styled, mq } from 'x'

import Search from 'static/svg/search.svg'

const Input = styled.input`
  border: 0;
  outline: none;
  padding: 20px;
  font-size: 18px;
  font-weight: 600;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 10px;
  border-bottom: 3px solid ${props => props.theme.primaryRGBA(.2)};
`

const Form = styled.form`
  width: 100%;
  padding: 0 50px;
  box-sizing: border-box;
  max-width: 700px;
  margin: 0 auto;
  
  &.sticky-search {
  }

  & > label {
    display: block;
    font-size: 14px;
    font-weight: 700;
    line-height: 10px;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: ${props => props.theme.primary};
    margin-bottom: 18px;
  }

  & > div {
    display: flex;

    & > ${ ButtonBlue } {
      height: 61px;
    }

    ${ mq.below('lg') } {
      display: block;
      & > ${ ButtonBlue } {
        line-height: 64px;
        font-size: 13px;
        width: 100%;
      }
    }

    & > input {
      margin-right: 10px;
    }
  }
`

export default props => {
  const {
    onSubmit,
    searchInput,
    activeSearchTerm,
    updateSearchInput,
  } = props

  return (
    <Form onSubmit={ onSubmit } className={ activeSearchTerm ? 'sticky-search' : '' }>
      <label>
        { props.globalData.stringSearchTerm }
      </label>
      <div>
        <Input
          value={ searchInput }
          onChange={ e => updateSearchInput(e.target.value) }
          autoFocus
        />
        <ButtonBlue as="button" type="submit">
          { props.globalData.stringSearch }
          <Search className="circle" />
        </ButtonBlue>
      </div>
    </Form>
  )
}
