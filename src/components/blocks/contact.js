import { compose, pure } from 'recompose'
import { Content, H2 } from 'components/common'
import { React, styled, mq } from 'x'
import {
  CreateForm,
  DefaultOptInCheckboxFieldGroup,
  DefaultCheckboxFieldGroup,
  DefaultRadioFieldGroup,
  OptIn,
} from 'components/form'

const Container = styled.div`
  padding: ${(props) => (props.isFirstBlock ? '0' : '60px')} 0px;
  background: ${(props) => (!props.isFirstBlock ? 'transparent' : '#F5F5F3')};
`

const ContactContent = styled.div`
  background: ${(props) => (props.isFirstBlock ? 'transparent' : '#F5F5F3')};
  overflow: hidden;
  width: 100%;
  max-width: 1366px;
  margin: 0 auto;
  box-sizing: border-box;

  padding: 100px;

  ${mq.below('lg')} {
    padding: 60px 80px;
  }
  ${mq.below('md')} {
    padding: 50px 60px;
  }
  ${mq.below('sm')} {
    padding: 40px 40px;
  }
`

const ContactWrapper = styled.div`
  max-width: 900px;
  margin: 0 auto;

  ${mq.below('md')} {
    padding: 60px 20px;
  }

  ${DefaultOptInCheckboxFieldGroup} {
    label {
      color: ${(props) => props.theme.primary};
    }
  }

  ${DefaultOptInCheckboxFieldGroup}, ${DefaultCheckboxFieldGroup} {
    span.checkmark {
      border: 2px solid rgba(42, 45, 88, 0.2);
      border-radius: 2px;
    }
  }
  ${DefaultRadioFieldGroup} {
    span.bullet {
      border: 2px solid rgba(42, 45, 88, 0.2);
    }
  }

  ${OptIn} {
    border-color: ${(props) => props.theme.primary};
  }
`

const Title = styled(H2)`
  text-align: center;
`

const Subtitle = styled.p`
  font-size: 16px;
  line-height: 28px;
  text-align: center;
  margin-bottom: 30px;
`

const enhance = compose(pure)

const Form = CreateForm({ enableComment: true, formType: 'contactUsForm' })

const Contact = (props) => {
  const isFirstBlock = props.firstBlock === props.data

  const titleElement =
    props.data.titleElement && props.data.titleElement !== 'default'
      ? props.data.titleElement
      : 'h2'

  return (
    <Container isFirstBlock={isFirstBlock}>
      <ContactContent isFirstBlock={isFirstBlock}>
        <ContactWrapper>
          <Title as={titleElement}>{props.data.title}</Title>
          <Subtitle>{props.data.subtitle}</Subtitle>
          <Form globalData={props.globalData} formType={'contactUs'} />
        </ContactWrapper>
      </ContactContent>
    </Container>
  )
}

export default enhance(Contact)
