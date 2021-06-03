import { Parallax } from 'react-scroll-parallax'
import { default as Plx } from 'react-plx'
import { React } from 'x'

const isSmall = typeof window !== 'undefined' && window.innerWidth <= 960
const isIE = typeof window !== 'undefined' && (
  '-ms-scroll-limit' in document.documentElement.style
  &&
  '-ms-ime-align' in document.documentElement.style
)

export const makeSpinParallax = Component => ({ children, style, ...props }) => {
  return (
    <Plx
      disabled={ isSmall || isIE }
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        ...style
      }}
      parallaxData={[
        {
          start: 'self',
          end: 'self',
          startOffset: 0,
          endOffset: '200vh',
          properties: [
            {
              startValue: 0,
              endValue: 360,
              property: 'rotate'
            },
          ]
        }
      ]}
    >
      <Component { ...props }>{ children }</Component>
    </Plx>
  )
}

export const makeParallax = Component => {

  return ({ children, className, offset, ...props }) => (
    <Parallax
      disabled={ isSmall || isIE }
      slowerScrollRate
      offsetYMin={ -offset }
      offsetYMax={ offset }
      styleOuter={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}
      styleInner={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}
    >
      <Component { ...props }>{ children }</Component>
    </Parallax>
  )
}
