import { styled, Link, mq } from 'x'

export const Content = styled.div`
  width: 100%;
  max-width: 1366px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 0 ${props => (props.noPadding ? '0' : '100px')};

  ${mq.below('lg')} {
    padding: 0 ${props => (props.noPadding ? '0' : '80px')};
  }
  ${mq.below('md')} {
    padding: 0 ${props => (props.noPadding ? '0' : '60px')};
  }
  ${mq.below('sm')} {
    padding: 0 ${props => (props.noPadding ? '0' : '40px')};
  }
`

export const H1 = styled.h1`
  font-size: 70px;
  font-weight: bold;
  line-height: 80px;
  width: 470px;
  margin: 0 0 60px 0;
  color: ${props => props.theme.primary};

  ${mq.below('lg')} {
    font-size: 55px;
    line-height: 60px;
    margin: 0 0 40px 0;
  }
  ${mq.below('md')} {
    font-size: 45px;
    line-height: 50px;
    margin: 0 0 30px 0;
  }
  ${mq.below('sm')} {
    font-size: 40px;
    line-height: 36px;
    margin: 0 0 20px 0;
  }
`

export const H2 = styled.h2`
  font-weight: 700;
  font-size: 50px;
  color: ${props => (props.color ? props.color : props.theme.primary)};
  line-height: 60px;
  ${props =>
    props.line &&
    `
  padding-bottom: 20px;
  position: relative;
  &:after {
    content: '';
    width: 20px;
    height: 2px;
    background-color: ${props.theme.secondary};
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  `}

  ${mq.below('lg')} {
    line-height: normal;
    font-size: 42px;
  }
  ${mq.below('md')} {
    line-height: normal;
    font-size: 38px;
  }
  ${mq.below('sm')} {
    line-height: normal;
    font-size: 34px;
  }
`

export const H3 = styled.h3`
  font-weight: 600;
  font-size: 24px;
  color: ${props => (props.color ? props.color : props.theme.primary)};
  line-height: 30px;
`

export const H4 = styled.h4`
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 1.2px;
  line-height: 20px;
  text-transform: uppercase;
  text-decoration: none;
  color: ${props => props.theme.primary};
  position: relative;

  ${props =>
    props.line &&
    `
    padding-bottom: 25px;
    &:after {
      content: '';
      width: 20px;
      height: 2px;
      background-color: ${props.theme.secondary};
      position: absolute;
      bottom: 0;
      left: 0;
    }
  `}
`

// export const Button = styled(Link)`
export const Button = styled(Link).attrs(p => ({
  className: 'gta-universal-button',
}))`
  color: ${props => props.theme.primary};
  background: #fff;
  display: inline-block;
  height: 64px;
  line-height: 64px;
  white-space: nowrap;
  position: relative;
  text-transform: uppercase;
  text-decoration: none;
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 1.2px;
  padding-left: 39px;
  padding-right: 100px;
  border: none;
  cursor: pointer;

  .circle {
    background-color: ${props => props.theme.primaryRGBA(0.05)};
    fill: ${props => props.theme.primary};
    position: absolute;
    top: 50%;
    right: 30px;
    margin-top: -16px;
    width: 13px;
    height: 13px;
    padding: 10px;
    border-radius: 30px;
  }

  .arrow {
    fill: ${props => props.theme.primary};
    position: absolute;
    top: 50%;
    right: 30px;
    transform: translateY(-50%);
  }

  & svg {
    transition: transform 0.3s;
  }

  &:hover {
    background: #f4f4f6;
    color: ${props => props.theme.primary};

    & svg {
      transform: translateX(10px);
    }

    .arrow {
      fill: #4c4e72;
    }
  }

  ${mq.below('lg')} {
    height: 50px;
    line-height: 50px;
    font-size: 12px;
    letter-spacing: 1.2px;
    padding-left: 20px;
    padding-right: 60px;

    .circle {
      top: 50%;
      right: 15px;
      margin-top: -12px;
      width: 8px;
      height: 8px;
      padding: 8px;
      border-radius: 16px;
    }

    .arrow {
      fill: ${props => props.theme.primary};
      position: absolute;
      top: 50%;
      right: 15px;
      transform: translateY(-50%);
    }
  }
`

export const ButtonYellow = styled(Button)`
  color: #fff;
  background: ${props => props.theme.secondary};
  .circle {
    fill: #fff;
    background-color: rgba(255, 255, 255, 0.16);
  }
  &:hover {
    background: #f3c378;
    color: #fff;
  }
`

export const ButtonBlue = styled(Button)`
  color: #fff;
  background: ${props => props.theme.primary};
  .circle {
    fill: #fff;
    background-color: rgba(255, 255, 255, 0.16);
  }
  &:hover {
    background: #4c4e72;
    color: #fff;
  }
`

export const TextButton = styled(Link)`
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 1.2px;
  line-height: 20px;
  text-transform: uppercase;
  color: ${props => props.theme.primary};
  padding-right: 28px;
  position: relative;
  display: inline-block;

  .arrow {
    fill: ${props => props.theme.primary};
    position: absolute;
    top: 5px;
    right: 0;
  }
  &:hover {
    color: #4c4e72;
  }
`

export const TextButtonWhite = styled(TextButton)`
  color: #fff;
  .arrow {
    fill: #fff;
  }
  &:hover {
    color: #f4f4f6;

    .arrow {
      fill: #f4f4f6;
    }
  }
`

export const TextButtonUnderlined = styled(TextButton)`
  padding-bottom: 10px;
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${props => props.theme.primary};
  }
`

export const TextButtonUnderlinedWhite = styled(TextButtonUnderlined)`
  color: #fff;
  &:after {
    background-color: #fff;
  }
  .arrow {
    fill: #fff;
  }
  &:hover {
    color: #f4f4f6;
    &:after {
      background-color: #f4f4f6;
    }

    .arrow {
      fill: #f4f4f6;
    }
  }
`

export const BorderedButton = styled(Button)`
  border: 1px solid ${props => props.theme.primaryRGBA(0.2)};
`

export const VideoSubtitle = styled.div`
  font-weight: 400;
  color: ${props => props.theme.primary};
  margin-top: 10px;
  font-size: 16px;
  line-height: 1.7em;
`
