import { compose, pure } from 'recompose'
import { Content } from 'components/common'
import { React, styled } from 'x'

import Arrow from 'static/svg/arrow.svg'

const Container = styled.div`
  background-color: #E9EAEE;
  padding: 100px 0;
`

const BulletPoints = styled.div`
  width: 100%;
  max-width: 920px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`

const ListItem = styled.div`
  text-align: left;
  padding: 10px 0;
  display: inline-flex;

  & svg {
    margin: 8px 30px 0 0;
    flex-shrink: 0;
  }

  & span {
    line-height: 26px;
  }
`

const enhance = compose(
  pure
)


const UnorderedList = props => {
  return (
    <Container>
      <Content>
      <BulletPoints>
      {
        props.data.listItems.map((item, index) => (
          <ListItem key={ 'unordered-item-' + index}>
            <Arrow />
            <span>{ item.listItem }</span>
          </ListItem>
        ))
      }
      </BulletPoints>
    </Content>
    </Container>
  )
}

export default enhance(UnorderedList)