import { React, styled, mq } from 'x'
import { Content, H4 } from 'components/common'
import { iconMap } from './iconGrid'

const Block = styled.div`
  padding: 60px 0;
`

const Items = styled.div`
  display: flex;
  flex-wrap: wrap;
  ${mq.below('md')} {
    flex-direction: column;
  }
`

const ItemWrapper = styled.div`
  display: flex;
  flex-basis: 33%;
  ${mq.below('lg')} {
    flex-basis: 50%;
  }
  ${mq.below('mq')} {
    flex-basis: auto;
  }
`

const Item = styled.div`
  display: flex;
  padding-right: 30px;
  ${mq.below('mq')} {
    padding-right: 0;
  }
  margin-bottom: 60px;
  flex-direction: column;
  justify-content: flex-end;
`

const IconWrapper = styled.div`
  display: flex;
  margin: 0 auto;
  justify-content: center;
  width: 230px;
  height: 80px;
  object-fit: contain;
  object-position: center;
`

const Info = styled.div`
  display: flex;
  align-items: center;
  margin-top: 40px;
`

const Number = styled.div`
  background-color: #e4b76e;
  width: 55px;
  height: 55px;
  border-radius: 30px;
  flex-shrink: 0;
  flex-grow: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  color: #2b2e55;
  font-size: 22px;
  margin-right: 20px;
`

const Summary = styled.div`
  color: #2b2e55;
  font-size: 18px;
  .highlight {
    color: #e4b76e;
    font-weight: 700;
  }
  p:first-child {
    margin-top: 0;
  }
  p:last-child {
    margin-bottom: 0;
  }
`

const BlockSummary = styled(Summary)`
  margin-top: 60px;
`

const NumberedList = (props) => {
  const titleElement =
    props.data.titleElement && props.data.titleElement !== 'default'
      ? props.data.titleElement
      : 'h3'
  return (
    <Block>
      <Content>
        <H4 as={titleElement} line>
          {props.data.title}
        </H4>
        <Items>
          {props.data.numberedItems.map((item, index) => {
            const SvgIcon = iconMap?.[item?.icon] ?? iconMap['time']
            return (
              <ItemWrapper key={index}>
                <Item>
                  {item.hideIcon === false && (
                    <IconWrapper>
                      <SvgIcon height="100%" width="100%" />
                    </IconWrapper>
                  )}
                  <Info>
                    <Number>{index + 1}</Number>
                    <Summary
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    />
                  </Info>
                </Item>
              </ItemWrapper>
            )
          })}
        </Items>
        <BlockSummary
          dangerouslySetInnerHTML={{ __html: props.data.content }}
        />
      </Content>
    </Block>
  )
}

export default NumberedList
