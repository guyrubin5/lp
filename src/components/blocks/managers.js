import { compose, pure } from 'recompose'
import { Content, H2 } from '../common'
import { React, Image, Link, styled, mq } from 'x'

import FacebookF from 'static/svg/FaFacebookF.svg'
import Twitter from 'static/svg/FaTwitter.svg'
import Linkedin from 'static/svg/FaLinkedin.svg'
import Instagram from 'static/svg/FaInstagram.svg'

const Container = styled.div`
  padding: 85px 0;
`

const ManagerWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: calc(100% + 30px);

  ${mq.below('xl')} {
    justify-content: center;
  }
`

const Title = styled(H2)`
  margin-top: 0px;
  margin-bottom: 40px;
`

const Manager = styled.div`
  padding: 11px 30px;
  box-sizing: border-box;
  width: 368px;
  height: 450px;
  margin: 15px 30px 15px 0;
  overflow: hidden;
  position: relative;
  transition: 0.15s all;

  /*
  background: #787878 url(${(props) =>
    props.image}) center;
  background-size: cover;
  */

  &:hover {
    .background {
      transform: translateY(0);
    }
    .wrapper {
      transform: translateY(51px);
    }
  }
`

const Picture = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`

const Background = styled.div`
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 1) 60%
  );
  transition: 0.15s transform;
  position: absolute;
  transform: translateY(60%);
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`

const Wrapper = styled.div`
  position: absolute;
  bottom: 81px;
  left: 30px;
  right: 30px;
  transition: 0.15s transform;
  transform: translateY(100%);
`

const Role = styled.div`
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1.2px;
  line-height: 20px;
  text-transform: uppercase;
  color: ${(props) => props.theme.secondary};
`

const Name = styled.div`
  font-size: 36px;
  font-weight: 700;
  line-height: 50px;
  color: #fff;
  margin-bottom: 15px;
`

const ManagerInfo = styled.div`
  color: #fff;
  margin-bottom: 15px;
  font-size: 16px;
`

const Social = styled.div`
  margin-top: 20px;
  display: flex;
`

const IconLink = styled.a`
  margin-right: 30px;
`

const IconFacebook = styled(FacebookF)`
  color: #fff;
`

const IconTwitter = styled(Twitter)`
  color: #fff;
`

const IconLinkedin = styled(Linkedin)`
  color: #fff;
`

const IconInstagram = styled(Instagram)`
  color: #fff;
`

const enhance = compose(pure)

const Managers = (props) => {
  const titleElement =
    props.data.titleElement && props.data.titleElement !== 'default'
      ? props.data.titleElement
      : 'h2'
  return (
    <Container>
      <Content>
        {props.data.title && (
          <Title as={titleElement}>{props.data.title}</Title>
        )}
        <ManagerWrapper>
          {props.data.managers.map((manager, index) => (
            <Manager
              key={'manager-' + index}
              image={manager.image ? manager.image.url : ''}
            >
              <Picture>
                {manager.image?.file?.sharp?.fixed && (
                  <Image
                    fixed={manager.image.file.sharp.fixed}
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      bottom: 0,
                      left: 0,
                    }}
                  />
                )}
              </Picture>
              <Background className="background" />
              <Wrapper className="wrapper">
                <Role>{manager.role}</Role>
                <Name>{manager.name}</Name>
                <ManagerInfo>{manager.born}</ManagerInfo>
                <ManagerInfo>{manager.joined}</ManagerInfo>
                <ManagerInfo>{manager.fact}</ManagerInfo>
                <Social>
                  {manager.facebook && (
                    <IconLink href={manager.facebook} target="_blank">
                      <IconFacebook height={16} />
                    </IconLink>
                  )}
                  {manager.twitter && (
                    <IconLink href={manager.twitter} target="_blank">
                      <IconTwitter height={16} />
                    </IconLink>
                  )}
                  {manager.linkedin && (
                    <IconLink href={manager.linkedin} target="_blank">
                      <IconLinkedin height={16} />
                    </IconLink>
                  )}
                  {manager.instagram && (
                    <IconLink href={manager.instagram} target="_blank">
                      <IconInstagram height={16} />
                    </IconLink>
                  )}
                </Social>
              </Wrapper>
            </Manager>
          ))}
        </ManagerWrapper>
      </Content>
    </Container>
  )
}
export default enhance(Managers)
