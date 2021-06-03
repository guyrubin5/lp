import { React, styled} from 'x'

const StyledLoader = styled.div`
  position: relative;
  display: block;
  width: 64px;
  height: 64px;
  margin: 0 auto;
  
  div {
    animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    transform-origin: 32px 32px;

    &:after {
      content: " ";
      display: block;
      position: absolute;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: rgba(42, 45, 88, 1);
      margin: -3px 0 0 -3px;
    }

    &:nth-child(1) {
      animation-delay: -0.036s;
    }
    &:nth-child(1):after {
      top: 50px;
      left: 50px;
    }
    &:nth-child(2) {
      animation-delay: -0.072s;
    }
    &:nth-child(2):after {
      top: 54px;
      left: 45px;
    }
    &:nth-child(3) {
      animation-delay: -0.108s;
    }
    &:nth-child(3):after {
      top: 57px;
      left: 39px;
    }
    &:nth-child(4) {
      animation-delay: -0.144s;
    }
    &:nth-child(4):after {
      top: 58px;
      left: 32px;
    }
    &:nth-child(5) {
      animation-delay: -0.18s;
    }
    &:nth-child(5):after {
      top: 57px;
      left: 25px;
    }
    &:nth-child(6) {
      animation-delay: -0.216s;
    }
    &:nth-child(6):after {
      top: 54px;
      left: 19px;
    }
    &:nth-child(7) {
      animation-delay: -0.252s;
    }
    &:nth-child(7):after {
      top: 50px;
      left: 14px;
    }
    &:nth-child(8) {
      animation-delay: -0.288s;
    }
    &:nth-child(8):after {
      top: 45px;
      left: 10px;
    }

  }
  
  @keyframes lds-roller {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

const Loader = () => {

  return (
    <StyledLoader>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </StyledLoader>
  )
}

export default Loader
