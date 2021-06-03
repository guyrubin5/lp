import { compose, withHandlers, withState } from 'recompose'
import { React, styled, Image, Filters, mq } from 'x'
import { Content, H4 } from 'components/common'
import referencesQuery from 'components/static/referencesQuery'
import Arrow from 'static/svg/arrow.svg'

const { below } = mq.createBreakpoints({
  custom: '1060px'
})

const CarouselWrapper = styled.div`
  display: flex;
  height: 144px;
  position: relative;
`

const CarouselButton = styled.div`
  width: 60px;
  background-color: #e9eaee;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  fill: ${props =>
    props.isClickable
      ? props.theme.primaryRGBA(0.4)
      : props.theme.primaryRGBA(0.1)};
  transform: rotate(${props => props.rotation});
  cursor: ${props => (props.isClickable ? 'pointer' : 'default')};

  & svg {
    transition: transform 0.1s ease-in-out;
  }

  &:hover {
    background-color: ${props => (props.isClickable ? '#f6f6f9' : '#E9EAE')};
    & svg {
      transform: translateX(${props => (props.isClickable ? 3 : 0)}px);
    }
  }
`

const CarouselContent = styled.div`
  overflow: hidden;
  background-color: #fff;
  flex: 1;
  position: relative;
`

const CarouselInner = styled.div`
  transform: translate(
    -${props => (100 / props.amount) * props.perPage * props.page}%
  );
  transition: transform 0.35s ease-in-out;
  height: 100%;
  width: ${props => props.amount * (100 / props.perPage)}%;

  > .item {
    width: ${props => 100 / props.amount}%;
  }
`

const enhanceCarousel = compose(
  withState('page', 'setPage', 0),
  withHandlers({
    left: props => () => {
      if (props.page <= 0) {
        return
      }
      props.setPage(props.page - 1)
    },
    right: props => () => {
      if (props.page >= props.children.length / props.perPage - 1) {
        return
      }
      props.setPage(props.page + 1)
    }
  })
)

const Carousel = props => {
  const amount = props.children.length

  return (
    <CarouselWrapper>
      <CarouselButton
        pointing="left"
        rotation={'180deg'}
        onClick={props.left}
        isClickable={props.page > 0}
      >
        <Arrow />
      </CarouselButton>
      <CarouselContent>
        <CarouselInner
          page={props.page}
          amount={amount}
          perPage={props.perPage}
        >
          {props.children}
        </CarouselInner>
      </CarouselContent>
      <CarouselButton
        pointing="right"
        rotation={'0deg'}
        onClick={props.right}
        isClickable={props.page < amount / props.perPage - 1}
      >
        <Arrow />
      </CarouselButton>
    </CarouselWrapper>
  )
}

const EnhancedCarousel = enhanceCarousel(Carousel)

const Container = styled.div`
  background-color: #fcfcfc;
  padding: 100px 0;
  ${mq.below('lg')} {
    padding: 70px 0;
  }
  ${mq.below('md')} {
    padding: 50px 0;
  }
`

const Columns = styled.div`
  display: flex;
  ${below('custom')} {
    flex-flow: column;
  }
`

const Column = styled.div`
  width: 50%;
  box-sizing: border-box;

  ${below('custom')} {
    width: 100%;
  }
`

const LeftColumn = styled(Column)`
  padding-right: 25px;
  ${below('custom')} {
    padding-right: 0;
    margin-bottom: 70px;
  }
  ${mq.below('lg')} {
    margin-bottom: 60px;
  }
  ${mq.below('md')} {
    margin-bottom: 50px;
  }
  ${mq.below('sm')} {
    margin-bottom: 40px;
  }
`

const RightColumn = styled(Column)`
  padding-left: 25px;
  ${below('custom')} {
    padding-left: 0;
  }
`

const Title = styled(H4)`
  margin-bottom: 90px;
  margin-block-start: 0px;

  ${below('custom')} {
    margin-bottom: 70px;
  }
  ${mq.below('lg')} {
    margin-bottom: 60px;
  }
  ${mq.below('md')} {
    margin-bottom: 50px;
  }
  ${mq.below('sm')} {
    margin-bottom: 40px;
  }
`

const Item = styled.div`
  float: left;
  height: 100%;
  background: ${props => props.background};
  box-sizing: border-box;
  padding: 20px;

  // IE11 Fix
  @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    img {
      height: auto !important;
      max-height: 100%;
      top: 50% !important;
      transform: translateY(-50%);
    }
  }
`

const References = props => {
  const accreditors = props.data.accreditors
  const partners = props.data.partners
  const clients = props.data.clients

  const filteredClients = clients.filter(
    node => node.acf.thumbnail?.file?.sharp.fixed
  )

  const combined = partners
    .concat(accreditors)
    .filter(node => node.acf.thumbnail?.file?.sharp.fixed)

  const perPage = do {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 400) 1
      else if (window.innerWidth < 500) 2
      else 3
    } else 3
  }

  /*
    (c) wezzle
    const perPage = typeof window !== 'undefined' && window.innerWidth < 500 ? window.innerWidth < 400 ? 1 : 2 : 3;
    */

  return (
    <Container>
      <Content>
        <Columns>
          <LeftColumn>
            <Title line={true}>
              {props.globalData.stringTraineesTrustedBy}
            </Title>
            <EnhancedCarousel perPage={perPage}>
              {filteredClients.map((node, index) => (
                <Item className="item" key={'client-' + index}>
                  <Image
                    fixed={node.acf.thumbnail.file.sharp.fixed}
                    style={{
                      height: '100%',
                      width: '100%'
                    }}
                    imgStyle={{
                      objectFit: 'contain'
                    }}
                  />
                </Item>
              ))}
            </EnhancedCarousel>
          </LeftColumn>
          <RightColumn>
            <Title line={true}>
              {props.globalData.stringAccceptedByAndPartneredWith}
            </Title>
            <EnhancedCarousel perPage={perPage}>
              {combined.map((node, index) => (
                <Item className="item" key={'client-' + index}>
                  <Image
                    fixed={node.acf.thumbnail.file.sharp.fixed}
                    style={{
                      height: '100%',
                      width: '100%'
                    }}
                    imgStyle={{
                      objectFit: 'contain'
                    }}
                  />
                </Item>
              ))}
            </EnhancedCarousel>
          </RightColumn>
        </Columns>
      </Content>
    </Container>
  )
}

export default referencesQuery(References)
