import { Content } from 'components/common'
import { compose, pure, withState } from 'recompose'
import { React, Image, Link, styled, mq } from 'x'

import Arrow from 'static/svg/dropdown.svg'

const Container = styled.div`
  padding: 100px 0;
  ${ mq.below('lg') } {
    padding: 70px 0;
  }
  ${ mq.below('md') } {
    padding: 50px 0;
  }
  ${ mq.below('sm') } {
    padding: 30px 0;
  }
`

const SectionTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  text-transform: uppercase;
  line-height: 50px;
  color: ${props => props.theme.secondary};
  margin-top: 60px;
`

const Question = styled.span`
  display: block;
  cursor: pointer;
  font-size: 18px;
  line-height: 24px;
  color: ${props => props.theme.primary};
  position: relative;
  padding-bottom: 15px;
  padding-top: 15px;
  padding-right: 50px;
  &:after {
    content: '';
    opacity: ${props => props.open ? '0' : '1'};
    ${'' /* transition: .15s opacity; */}
    position: absolute;
    bottom: 0;
    left: 0;
    height: 1px;
    background-color: ${props => props.theme.primary};
    width: 100%;
  }

  .arrow {
    position: absolute;
    right: 30px;
    top: 50%;
    transform: translateY(-50%) ${props => props.open && 'rotate(180deg)'};
    ${'' /* transition: .15s all; */}
    fill: ${props => props.theme.primary};
  }
`

const Answer = styled.div`
  display: block;
  height: ${props => props.open ? 'auto' : '0px'};
  opacity: ${props => props.open ? '1' : '0'};
  transition: .15s opacity;
  overflow: hidden;
  font-size: 16px;
  line-height: 28px;
  padding: 0 30px;
`

const FAQQuestionAnswer = compose(
  withState('open', 'setOpen', false)
)(props => {
    return (
      <div>
        <Question
          open={ props.open }
          onClick={ event => (props.setOpen(!props.open), event.preventDefault()) }
        >{ props.item.question }<Arrow
          className="arrow"/></Question>
        <Answer open={ props.open } dangerouslySetInnerHTML={ { __html: props.item.answer } }/>
      </div>
    )
  }
)

const enhance = compose(
  pure
)

const FAQBlock = props => {
  return (
    <Container>
      <Content>
        <SectionTitle>{ props.data.supportTitle }</SectionTitle>
        {
          props.data.support.map((item, index) => (
            <FAQQuestionAnswer item={ item } key={ 'support-' + index } />
          ))
        }
        <SectionTitle>{ props.data.financeTitle }</SectionTitle>
        {
          props.data.finance.map((item, index) => (
            <FAQQuestionAnswer item={ item } key={ 'finance-' + index } />
          ))
        }
        <SectionTitle>{ props.data.otherTitle }</SectionTitle>
        {
          props.data.other.map((item, index) => (
            <FAQQuestionAnswer item={ item } key={ 'other-' + index } />
          ))
        }
      </Content>
    </Container>
  )
}


export default enhance(FAQBlock)
