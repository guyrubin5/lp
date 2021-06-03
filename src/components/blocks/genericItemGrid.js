import { default as Fade } from 'react-reveal/Fade'
import { Content, H4, TextButton } from 'components/common'
import { React, Link, Image, styled, Filters, mq } from 'x'

import Arrow from 'static/svg/arrow.svg'

const { below } = mq.createBreakpoints({
  itemsMD: '915px',
  itemsLG: '970px',
})

const Container = styled.div`
  background-color: #e9eaee;
  padding: 70px 0;
  position: relative;
  overflow: hidden;

  ${mq.below('lg')} {
    padding: 60px 0;
  }
  ${mq.below('md')} {
    padding: 50px 0;
  }
  ${mq.below('sm')} {
    padding: 50px 0 40px 0;
  }
`

const ItemContent = styled(Content)`
  overflow: hidden;
  position: relative;
  z-index: 2;
  ${below('itemsMD')} {
    padding: 0;
  }
`

const Title = styled(H4)`
  margin-bottom: 70px;
  ${mq.below('lg')} {
    margin-bottom: 60px;
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
  z-index: 2;
  height: calc(100% - 50px);

  ${below('itemsLG')} {
    margin: 0 48px 48px 0;
    width: 300px;
  }
  ${below('itemsMD')} {
    flex: 0 0 80%;
    margin-left: ${(props) => (props.isFirst ? '5%' : 0)};
  }
`

const ItemTitle = styled(Link)`
  display: block;
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
  bottom: 42px;
  padding: 10px 28px 10px 0;
  color: ${(props) => props.theme.secondary};
  & > .arrow {
    fill: ${(props) => props.theme.secondary};
    top: 15px;
  }
  &:hover {
    color: #eda331;
  }
`

const BackgroundHeader = styled.div`
  height: 200px;
  position: relative;
  width: 100%;
  padding: 0px 38px 0px 38px;
  margin-left: -38px;
  margin-top: -62px;
  margin-bottom: 35px;
`

const BackgroundHeaderImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
`

const BackgroundHeaderGradient = styled(Link)`
  background: radial-gradient(
    circle at center,
    rgba(0, 0, 0, 0.2) 50%,
    transparent 140%
  );
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
`

export default (props) => {
  const items = props.data.items

  const titleElement =
    props.data.titleElement && props.data.titleElement !== 'default'
      ? props.data.titleElement
      : 'h4'
  return (
    <Container>
      <ItemContent>
        {props.data.title && (
          <Title as={titleElement} line={true}>
            {props.data.title}
          </Title>
        )}
        <ItemContainer>
          {items.map((item, index) => (
            <Fade key={index} delay={(index % 3) * 200}>
              <Item isFirst={index === 0} isLast={index === items.length - 1}>
                {item.image && (
                  <BackgroundHeader>
                    <Image
                      fixed={item.image.file.sharp.fixed}
                      style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        height: 'auto',
                        width: '100%',
                      }}
                    />
                    <BackgroundHeaderGradient to={item.ctaUrl} />
                  </BackgroundHeader>
                )}
                <ItemTitle to={item.ctaUrl}>{item.title}</ItemTitle>
                {item.summary && (
                  <ItemSummary
                    dangerouslySetInnerHTML={{ __html: item.summary }}
                  />
                )}
                <ItemTextButton to={item.ctaUrl}>
                  {item.ctaLabel}
                  <Arrow className="arrow" />
                </ItemTextButton>
              </Item>
            </Fade>
          ))}
        </ItemContainer>
      </ItemContent>
    </Container>
  )
}
