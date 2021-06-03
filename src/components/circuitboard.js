import { keyframes } from 'styled-components'
import { Content, H2, H4, Button } from 'components/common'
import { React, Image, styled, mq } from 'x'
import { compose, pure, lifecycle, withState, withHandlers } from 'recompose'

import Motherboard from 'static/svg/motherboard.svg'
import CircuitboardBackground from 'static/img/circuitboard.png'
import CircuitboardLines from 'static/svg/circuitboard.svg'


const Wrapper = styled.div`
  width: 100%;
  background-image: url(${ CircuitboardBackground });
  background-size: 800px 800px;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  & svg {
    height: 800px;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  & path {
    fill: none;
    stroke: #2589FD;
    stroke-dasharray: 100, 10, 200, 10;
    stroke-dashoffset: 1000;
    stroke-width: .0625rem;
  }
`


const enhance = compose(
  withState('paths', 'setPaths', null),
  withHandlers({
    registerCircuitboard: props => async ref => {
      if (!ref) return

      const { default: anime } = await import('animejs')

      const paths = ref.querySelectorAll('path')
      const groups = ref.querySelectorAll('g')

      props.setPaths(paths)

      groups.forEach(group => {

        0 && anime({
          targets: group.querySelectorAll('path'),
          strokeDashoffset: [anime.setDashoffset, 0],
          easing: 'easeInOutQuint',
          duration: anime.random(1000, 2000),
          delay: anime.random(0, 3000),
          endDelay: anime.random(1000, 5000),
          // endDelay: (path, i) => anime.random(1000, 3000),
          // delay: anime.random(0, 2000),
          direction: 'alternate',
          loop: true,
          autoplay: true,
        })
      })

      1 && paths.forEach(path => {
        anime({
          targets: path,
          strokeDashoffset: [anime.setDashoffset, 0],
          easing: 'easeInOutQuint',
          duration: anime.random(1000, 2000),
          delay: anime.random(0, 3000),
          endDelay: anime.random(1000, 5000),
          // endDelay: (path, i) => anime.random(1000, 3000),
          // delay: anime.random(0, 2000),
          direction: 'alternate',
          loop: true,
          autoplay: true,
        })
      })
    }
  }),

  lifecycle({
    // componentWillUnmount() {
    //   anime.remove(this.props.paths)
    // }
  }),
)

const AnimatedCircuitboard = props => {
  return (
    <Wrapper
      ref={ props.registerCircuitboard }
      { ...props }
    >
      <CircuitboardLines />
    </Wrapper>
  )
}

export default enhance(AnimatedCircuitboard)
