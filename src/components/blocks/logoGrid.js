import { compose, pure } from 'recompose'
import { Image, React, Link, styled, mq } from 'x'

const Logo = styled.div`
  width: ${props => (props.small ? '180px' : '261px')};
  height: ${props => (props.small ? '80px' : '105px')};
  box-sizing: border-box;
  margin-right: 40px;
  margin-bottom: 40px;
  background-color: #fff;
  ${props => (props.scrollable ? '&' : '> none')} {
    ${mq.below('lg')} {
      margin-left: ${props => (props.isFirst ? '5%' : 0)};
      margin-right: ${props => (props.isLast ? '5%' : '40px')};
    }
  }
`

const LogoWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: calc(100% + 40px);
  ${props => (props.scrollable ? '&' : '> none')} {
    ${mq.below('lg')} {
      width: 100%;
      overflow-x: scroll;
      -webkit-overflow-scrolling: touch;
      flex-wrap: nowrap;
      justify-content: start;

      ${Logo} {
        flex: 0 0 ${props => (props.small ? '180px' : '261px')};
      }

      &:after {
        content: '';
        flex: 0 0 1px;
      }
    }
  }
`

const Padding = styled.div`
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ImageContainer = styled.div`
  position: relative;
  max-width: 185px;
  width: 100%;
  height: 100%;

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

const Empty = props => <>{props.children}</>

const enhance = compose(pure)

const LogoGrid = props => {
  const logos = props.logos
  return (
    <LogoWrapper scrollable={props.scrollable} small={props.small}>
      {logos.map((node, index) => {
        let url = node?.acf?.url
        if (!url) {
          url = node.link || null
        }

        const link =
          url && url.startsWith(props.globalData.siteUrl)
            ? props.globalData.formatLink(url)
            : url

        const maybeProps = url === null ? {} : { to: link }
        const MaybeLink = url === null ? Empty : Link

        return (
          <Logo
            small={props.small}
            isLast={index === props.logos.length - 1}
            isFirst={index === 0}
            key={index}
          >
            <MaybeLink {...maybeProps}>
              <Padding>
                <ImageContainer>
                  <Image
                    fixed={node.acf.thumbnail.file.sharp.fixed}
                    alt={node.title}
                    style={{
                      height: '100%',
                      width: '100%',
                      position: 'absolute',
                      top: 0,
                      left: 0
                    }}
                    imgStyle={{
                      objectFit: 'contain'
                    }}
                  />
                </ImageContainer>
              </Padding>
            </MaybeLink>
          </Logo>
        )
      })}
    </LogoWrapper>
  )
}

export default enhance(LogoGrid)
