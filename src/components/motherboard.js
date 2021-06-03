import { keyframes } from 'styled-components'
import { Content, H2, H4, Button } from 'components/common'
import { React, Image, styled, mq } from 'x'
import { compose, pure, lifecycle, withState, withHandlers } from 'recompose'

import Sparks from 'static/svg/sparks.svg'
import Motherboard from 'static/svg/motherboard-2.svg'

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: ${ props => props.theme.primary };
  // top: -37%;

  & svg {
    position: absolute;
    top: 0;
    left: 0;
  }

  @media (max-aspect-ratio: 7/13) {
    & svg {
      height: 100%;
    }
  }
  @media (min-aspect-ratio: 7/13) {
    & svg {
      width: 100%;
    }
  }

  & path {
    stroke-width: 2;
  }

  & rect {
    stroke-width: 1;
    stroke: #2589FD;
    fill: #fff;
  }
`

const enhance = compose(
  withState('paths', 'setPaths', null),
  withHandlers({
    registerMotherboard: props => async ref => {
      if (!ref) return

      const { default: anime } = await import('animejs')

      const svg = ref.querySelector('svg')
      const paths = ref.querySelectorAll('path')
      const sparks = ref.querySelectorAll('rect')

      props.setPaths(paths)

      1 && sparks.forEach(spark => {

        const path = anime.path(paths[
          Math.round(Math.random() * (paths.length - 1))
        ])

        anime({
          targets: spark,
          translateX: path('x'),
          translateY: path('y'),
          translateZ: 0,
          rotate: path('angle'),
          easing: 'easeInOutQuint',
          delay: anime.random(0, 3000),
          duration: 2000,
          endDelay: anime.random(1000, 3000),
          loop: true,
          autoplay: true,
          opacity: [
            { value: 0, duration: 0 },
            { value: 1, duration: 200 },
            { value: 1, duration: 1600 },
            { value: 0, duration: 200 },
          ],
          scaleX: [
            { value: 0, duration: 0 },
            { value: 1, duration: 200 },
            { value: 4, duration: 1000 },
            { value: 1, duration: 600 },
            { value: 0, duration: 200 },
          ]
        })

      })

      if (typeof IntersectionObserver === 'undefined') return

      const animations = []

      paths.forEach(path => {
        animations.push(anime({
          targets: path,
          strokeDashoffset: [anime.setDashoffset, 0],
          easing: 'easeInOutQuint',
          duration: anime.random(1000, 3000),
          delay: anime.random(0, 5000),
          direction: 'normal',
          autoplay: false,
        }))
      })

      const observer = new IntersectionObserver(entries => {
        if (entries[0].intersectionRatio > 0) {
          animations.forEach(animation => animation.play())
          observer.unobserve(svg)
        }
      })

      observer.observe(svg)
    }
  }),

  lifecycle({
    // componentWillUnmount() {
    //   anime.remove(this.props.paths)
    // }
  }),
)

const AnimatedMotherboard = props => {

  return (
    <Wrapper
      ref={ props.registerMotherboard }
      { ...props }
    >
      <Motherboard />
      <Sparks />
    </Wrapper>
  )
}

export default enhance(AnimatedMotherboard)
