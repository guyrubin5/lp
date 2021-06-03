import { compose, pure } from 'recompose'
import { Content, H4, TextButton } from 'components/common'
import { React, Link, styled, mq } from 'x'

import Arrow from 'static/svg/arrow.svg'

const { below } = mq.createBreakpoints({
  itemsMD: '915px',
  itemsLG: '970px',
})

const Container = styled.div`
  background-color: #e9eaee;
  padding: 100px 0;
  ${mq.below('lg')} {
    padding: 70px 0;
  }
  ${mq.below('md')} {
    padding: 50px 0;
  }
  ${mq.below('sm')} {
    padding: 60px 0 40px 0;
  }
`

const ItemContent = styled(Content)`
  overflow: hidden;
  position: relative;
  ${below('itemsMD')} {
    padding: 0;
  }
`

const Title = styled(H4)`
  margin-bottom: 100px;
  ${mq.below('lg')} {
    margin-bottom: 70px;
  }
  ${mq.below('md')} {
    margin-bottom: 50px;
  }
  ${mq.below('sm')} {
    margin-bottom: 40px;
  }

  ${below('itemsMD')} {
    margin-left: 5%;
  }
`

const ItemContainer = styled.div`
  width: calc(100% + 35px);
  display: flex;
  flex-wrap: wrap;
  ${below('itemsMD')} {
    flex-wrap: nowrap;
    width: 100%;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
    &:after {
      content: '';
      flex: 0 0 1px;
    }
  }
`

const Item = styled.div`
  background: #fff;
  box-sizing: border-box;
  padding: 62px 38px 82px 38px; // Bottom includes ItemTextButton which is absolute
  width: 364px;
  margin: 0 35px 35px 0;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.2) 0 4px 10px;
  ${below('itemsLG')} {
    margin: 0 30px 30px 0;
  }
  ${below('itemsMD')} {
    flex: 0 0 80%;
    margin-left: ${(props) => (props.isFirst ? '5%' : 0)};
  }
`

const ItemIndex = styled.small`
  display: block;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 1.2px;
  line-height: 20px;
  padding-bottom: 35px;
  margin-bottom: 35px;
  position: relative;
  color: ${(props) => props.theme.primary};
  &:after {
    content: '';
    width: 20px;
    height: 2px;
    background-color: ${(props) => props.theme.secondary};
    position: absolute;
    bottom: 0;
    left: 0;
  }
`

const ItemHeader = styled.div`
  position: relative;
`

const HeaderImage = styled.div`
  position: absolute;
  box-sizing: border-box;
  height: 55px;
  max-width: 50%;
  right: 0;
  top: 0;
`

const ItemTitle = styled(Link)`
  font-size: 24px;
  font-weight: 600;
  line-height: 30px;
  color: ${(props) => props.theme.primary};
  text-transform: uppercase;
  margin-bottom: 16px;
`

const ItemSummary = styled.p`
  font-size: 16px;
  line-height: 28px;
  color: ${(props) => props.theme.primary};
  margin: 16px 0;

  b,
  strong {
    font-weight: 600;
  }

  a {
    color: ${(props) => props.theme.primary};
    text-decoration: underline;
  }
`

const ItemTextButton = styled(TextButton)`
  position: absolute;
  bottom: 62px;
  color: ${(props) => props.theme.secondary};
  & > .arrow {
    fill: ${(props) => props.theme.secondary};
  }
  &:hover {
    color: #eda331;
  }
`

const CourseCollection = (props) => {
  const title = props.data.title
  const formatLink = props.globalData.formatLink

  const titleElement =
    props.data.titleElement && props.data.titleElement !== 'default'
      ? props.data.titleElement
      : 'h2'
  return (
    <Container>
      <ItemContent>
        {title && (
          <Title as={titleElement} line={true}>
            {title}
          </Title>
        )}
        <ItemContainer>
          {props.data.courses.map((node, index) => (
            <Item
              key={node.id}
              isFirst={index === 0}
              isLast={index === props.data.courses.length - 1}
            >
              <ItemHeader>
                <ItemIndex>{('0' + (index + 1)).substr(-2)}</ItemIndex>
              </ItemHeader>
              <ItemTitle to={props.globalData.formatLink(node.link)}>
                {node.title}
              </ItemTitle>
              {node.acf && node.acf.summary && (
                <ItemSummary
                  dangerouslySetInnerHTML={{ __html: node.acf.summary }}
                />
              )}
              <ItemTextButton to={formatLink(node.link)}>
                {props.globalData.stringFindOutMore}
                <Arrow className="arrow" />
              </ItemTextButton>
            </Item>
          ))}
        </ItemContainer>
      </ItemContent>
    </Container>
  )
}

export default compose(pure)(CourseCollection)
