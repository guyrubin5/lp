import { Content } from 'components/common'
import { React, styled, Image, mq } from 'x'
import { compose, pure, withState, withHandlers } from 'recompose'

import ArrowSvg from 'static/svg/testimonial-arrow.svg'
import TestimonialBackgroundSvg from 'static/svg/testimonial.svg'

const Container = styled.div`
  background-color: ${props => props.theme.primary};
  padding: 45px 0;
`

const Wrapper = styled.div`
  background-color: #FFF;
  padding: 30px 70px;
  position: relative;

  // USED IN AVATAR AND TESTIMONIAL STYLED COMPONENTS
  @keyframes testimonialFadeInActive {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  @keyframes testimonialFadeInShown {
    0% { opacity: 0; }
    100% { opacity: 0.29; }
  }
`

const TestimonialBackground = styled(TestimonialBackgroundSvg)`
  position: absolute;
  height: 70%;
  top: 50%;
  transform: translateY(-50%);
`

const Nav = styled.div`
  position: absolute;
  right: 70px;

  ${ mq.below('lg') } {
    right: 10px;
    left: 10px;
  }
`

const Arrow = styled(ArrowSvg)`
  transform: rotate(${props => props.left ? '180deg' : '0deg'});
  width: 40px;
  margin: 0 10px;
  cursor: ${ props => props.active ? 'pointer' : 'default' };

  > path {
    fill: ${props => props.active ? props.theme.secondary : '#E9EAEE'};
  }

  ${ mq.below('lg') } {
    position: absolute;
    ${ props => props.left ? 'left' : 'right'}: 20px;
    top: 40px;
  }
`

const Avatars = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 25px;
`

const Avatar = styled.div`
  width: ${props => (props.left || props.right) ? '62px' : '115px'};
  height: ${props => (props.left || props.right) ? '62px' : '115px'};
  border-radius: 1000px;
  overflow: hidden;
  opacity: ${props => props.active ? '1' : props.left || props.right ? '0.29' : '0'};
  margin-left: ${props => props.isFirst && props.active ? '82px;' : '20px'};
  margin-right: ${props => props.isLast && props.active ? '62px;' : '0'};
  display: ${props => props.active || props.left || props.right ? 'block' : 'none'};
  animation: ${props => props.active ? 'testimonialFadeInActive' : 'testimonialFadeInShown'} 0.5s;
  transition: opacity 0.2s;
  cursor: pointer;

  ${ mq.below('md') } {
    display: ${ props => props.active ? 'block' : 'none' };
    margin: 0;
  }


  ${ props => props.animateOut && 'opacity: 0;' }
`

const Testimonial = styled.div`
  padding: 0 20px;
  opacity: ${props => props.active ? '1' : '0'};
  display: ${props => props.active ? 'block' : 'none'};

  animation: testimonialFadeInActive 0.5s;
  transition: opacity 0.2s;
  ${ props => props.animateOut && 'opacity: 0;' }
`

const Text = styled.p`
  font-size: 24px;
  font-weight: 600;
  line-height: 30px;
  color: ${props => props.theme.primary};
  max-width: 720px;
  text-align: center;
  margin: 0 auto 20px;
`

const Person = styled.div`
  font-size: 13px;
  letter-spacing: 1.2px;
  line-height: 20px;
  text-transform: uppercase;
  font-weight: 600;
  color: ${props => props.theme.secondary};
  text-align: center;
  margin-bottom: 60px;
  &:before {
    content: '- '
  }
`

const Bullets = styled.div`
  display: flex;
  justify-content: center;
`

const Bullet = styled.div`
  border-radius: 5px;
  height: 10px;
  width: 10px;
  margin: 0 5px;
  background-color: ${props => props.active ? props.theme.secondary : props.theme.primaryRGBA(.4)};
  cursor: pointer;
`

const enhance = compose(
  pure,
  withState('active', 'setActiveState', 0),
  withState('animateOut', 'setAnimateOutState', 0),
  withHandlers(() => {
    const arrowRefs = []
    let onEnd = null
    const onTransitionEnd = () => {
      if (typeof onEnd === 'function') {
        onEnd()
        onEnd = null
      }
    }
    return {
      setAvatarRef: () => ref => {
        if (ref) {
          arrowRefs.push(ref)
          ref.addEventListener('transitionend', onTransitionEnd)
        }
      },
      setActive: props => index => {
        props.setAnimateOutState(true)
        onEnd = () => {
          props.setActiveState(index)
          props.setAnimateOutState(false)
        }
      }
    }
  })
)

const Testimonials = props => {
  return (
    <Container>
      <Content>
        <Wrapper>
          <TestimonialBackground/>
          <Nav>
            <Arrow
              left={ 1 }
              active={ props.active > 0 ? 1 : 0 }
              onClick={ () => {
                if (props.active > 0) {
                  props.setActive(props.active - 1)
                }
              } }
            />
            <Arrow
              active={ props.active < props.data.testimonials.length - 1 ? 1 : 0 }
              onClick={ () => {
                if (props.active < props.data.testimonials.length - 1) {
                  props.setActive(props.active + 1)
                }
              } }
            />
          </Nav>
          <Avatars>
            {
              props.data.testimonials.map((item, index) => (
                <Avatar
                  ref={ props.setAvatarRef }
                  key={ item.id }
                  active={ index === props.active }
                  left={ index === props.active - 1 }
                  right={ index === props.active + 1 }
                  isFirst={ index === 0 }
                  animateOut={ props.animateOut }
                  isLast={ index === props.data.testimonials.length - 1 }
                  onClick={ () => props.setActive(index) }
                >
                  <Image
                    fluid={ item.acf.image.file.sharp.fluid }
                    style={ {
                      height: '100%',
                      width: '100%'
                    } }
                  />
                </Avatar>
              ))
            }
          </Avatars>
          <div>
            {
              props.data.testimonials.map((item, index) => (
                <Testimonial
                  key={ item.id }
                  active={ index === props.active }
                  animateOut={ props.animateOut }
                >
                  <Text>{ item.acf.quote }</Text>
                  <Person>{ item.acf.name }</Person>
                </Testimonial>
              ))
            }
          </div>
          <Bullets>
            {
              props.data.testimonials.map((item, index) => (
                <Bullet
                  active={ index === props.active }
                  key={ item.id }
                  onClick={ () => props.setActive(index) }
                />
              ))
            }
          </Bullets>
        </Wrapper>
      </Content>
    </Container>
  )
}

export default enhance(Testimonials)
