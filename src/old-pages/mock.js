import { React, Link, styled, mq } from 'x'

const Overlay = styled.div`
  background: #eee;
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Block = styled.div`
  padding: 60px;
  border: 3px solid hotpink;
  background: #fff;
  border-radius: 10px;

  ${ mq.below('md') } {
    box-shadow: 0 0 0 4px black;
  }

  ${ mq.above('md') } {
    box-shadow: 0 0 0 4px purple;
  }

  ${ mq.between('sm', 'lg') } {
    text-shadow: 0 3px 3px hotpink;
  }

  ${ mq.only('xs') } {
    & #xs {
      font-weight: bold;
    }
  }

  ${ mq.only('sm') } {
    & #sm {
      font-weight: bold;
    }
  }

  ${ mq.only('md') } {
    & #md {
      font-weight: bold;
    }
  }

  ${ mq.only('lg') } {
    & #lg {
      font-weight: bold;
    }
  }

  ${ mq.above('xl') } {
    & #xl {
      font-weight: bold;
    }
  }
`

export default () => (
  <Overlay>
    <Block>
      <div id="xs">xs: 0px</div>
      <div id="sm">sm: 544px</div>
      <div id="md">md: 768px</div>
      <div id="lg">lg: 960px</div>
      <div id="xl">xl: 1200px</div>
    </Block>
  </Overlay>
)
