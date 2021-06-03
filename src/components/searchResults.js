import { React, Link, styled } from 'x'

import Arrow from 'static/svg/arrow.svg'

const Result = styled.div`
  width: 100%;
  padding: 20px 50px;
  box-sizing: border-box;
  max-width: 900px;
  margin: 0 auto;
`

const Title = styled.div`
  font-size: 14px;
  font-weight: 700;
  line-height: 10px;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  color: ${props => props.theme.primary};
  margin-bottom: 18px;
`

const ItemTitle = styled.span`
  margin-right: auto;
`

const ItemArrow = styled.i`
  display: flex;
  background: #fff;
  border-radius: 50px;
  width: 25px;
  height: 25px;
  align-items: center;
  justify-content: center;
`

const Item = styled(Link)`
  color: ${ props => props.theme.primary };
  background: #fff;
  border-radius: 4px;
  display: flex;
  margin: 10px 0;
  font-size: 18px;
  padding: 20px;
  font-weight: 600;
  align-items: center;
`

const Loading = styled.div`
  color: ${ props => props.theme.primary };
  font-size: 18px;
  padding: 20px;
  font-weight: 600;
  text-align: center;
`

export default props => {

  if (props.isLoading) {
    return <Loading>{ props.globalData.stringLoading }...</Loading>
  }

  return (
    <div>
      <Result>
        <Title>{ props.globalData.stringPages }</Title>
        {
          props.searchResults.wordpress && props.searchResults.wordpress.length
            ? props.searchResults.wordpress.map((result, index) => (
              <Item
                key={ 'search-' + index }
                to={ props.globalData.formatLink(result.link) }
                className={ 'gta-search-result-main'}

              >
                <ItemTitle>{ result.title.rendered }</ItemTitle>
                <ItemArrow>
                  <Arrow />
                </ItemArrow>
              </Item>
            ))
            : props.globalData.stringNoResults
        }
      </Result>
      <Result>
        <Title>{ props.globalData.stringNews }</Title>
        {
          props.searchResults.hubspot && props.searchResults.hubspot.length
            ? props.searchResults.hubspot.map((result, index) => (
              <Item
                key={ 'search-' + index }
                to={ result.url }
                className={ 'gta-search-result-blog'}
              >
                  <ItemTitle dangerouslySetInnerHTML={{
                    __html: result.title
                  }} />
                  <ItemArrow>
                    <Arrow />
                  </ItemArrow>
                </Item>
              ))
            : props.globalData.stringNoResults
        }
      </Result>
    </div>
  )
}
