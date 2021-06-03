import { ButtonBlue } from 'components/common'
import { React, styled, Yup, mq } from 'x'

import { CreateForm, DefaultFieldHeader, OptIn } from 'components/form'

const FormWrapper = styled.form`
  display: flex;
  flex-flow: wrap;
  width: 300px;
  background: ${(props) => props.theme.secondary};
  margin: 60px auto 0 auto;
  border-radius: 5px;
  padding: 15px;
  box-sizing: border-box;
  max-width: 100%;

  .PhoneInputCountry {
    background: #fff;
    height: 28px;
    padding: 0 5px;
    font-size: 16px;
    line-height: 1;

    .PhoneInputCountryIcon {
      transform: scale(0.75);
      //transform-origin: top left;
    }
    .PhoneInputCountrySelectArrow {
      transform: scale(0.75) rotate(45deg);
    }

    --PhoneInputCountrySelectArrow-marginLeft: 0.2em;
    --PhoneInputCountryFlag-height: 15px;
    --PhoneInputCountrySelectArrow-color: #000;
    --PhoneInputCountrySelectArrow-color--focus: #000;
    --PhoneInputCountryFlag-borderColor: #000;
  }

  .PhoneInputCountrySelect:focus + .PhoneInputCountryIcon--border {
    box-shadow: none;
  }

  .PhoneInputCountryIcon {
    border: none;
    box-shadow: none;
    background: transparent;
    font-size: 15px;
    width: auto;
  }

  ${DefaultFieldHeader} {
    margin: 5px 0;
  }

  ${OptIn} {
    padding-top: 0;
  }
`

const SubmitButton = styled(ButtonBlue)`
  width: 100%;
  font-size: 18px;
  text-align: left;
  font-weight: 700;
  border-radius: 10px;
  margin-top: 15px;
`

const FindOutMore = styled.div`
  font-size: 22px;
  font-weight: 700;
  text-transform: uppercase;
  color: white;
  margin-bottom: 20px;
  text-align: center;
  width: 100%;
`

const FieldGroup = styled.div`
  width: 100%;
  margin-bottom: 15px;

  label {
    display: block;
    font-size: 18px;
    font-weight: 600;
    line-height: 10px;
    letter-spacing: 1.2px;
    color: ${(props) => props.theme.primary};
    margin-bottom: 5px;
  }

  input[type='text'],
  input[type='email'],
  input[type='tel'] {
  }

  input {
    border: none;
    width: 100%;
    box-sizing: border-box;
    padding: 5px;
    background: #fff;
    font-size: 16px;
    margin-bottom: 10px;
    outline: none;
  }

  input.error {
    border-color: rgba(255, 0, 0, 0.6);
  }

  ${mq.below('lg')} {
    box-sizing: border-box;
    width: 100%;
    padding: 0 15px;
  }
`

const CheckboxFieldGroup = styled(FieldGroup)`
  display: flex;
  align-items: center;
  padding-top: 0px;
  position: relative;
  box-sizing: border-box;
  margin-bottom: 5px;

  label {
    position: relative;
    margin-bottom: 0;
    padding-left: 28px;
    font-size: 13px;
    line-height: 13px;
    letter-spacing: normal;
    height: 30px;
    display: flex;
    align-items: center;
  }
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  .checkmark {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 20px;
    width: 20px;
    background-color: #fff;
  }
  .checkmark:after {
    content: '';
    position: absolute;
    display: none;
    left: 6px;
    top: 2px;
    width: 5px;
    height: 10px;
    border: solid #fff;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
  &:hover input ~ .checkmark:after {
    display: block;
    border-color: ${(props) => props.theme.primaryRGBA(0.2)};
  }
  input:checked ~ .checkmark {
    background-color: ${(props) => props.theme.primary};
  }
  input:checked ~ .checkmark:after {
    display: block;
    border-color: #fff;
  }
`

const OptInCheckboxFieldGroup = styled(FieldGroup)`
  display: flex;
  flex-direction: column;
  padding-top: 8px;
  position: relative;
  box-sizing: border-box;
  margin-bottom: 0;
  padding-top: 8px;

  label {
    position: relative;
    margin-bottom: 0;
    padding-left: 28px;
    font-size: 13px;
    line-height: 13px;
    letter-spacing: normal;
    display: flex;
    align-items: center;
    color: #fff;
    a {
      color: ${(props) => props.theme.primary};
      text-decoration: underline;
    }
    p {
      margin: 0;
    }
  }
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  .checkmark {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 20px;
    width: 20px;
    background-color: #fff;
  }
  .checkmark:after {
    content: '';
    position: absolute;
    display: none;
    left: 6px;
    top: 2px;
    width: 5px;
    height: 10px;
    border: solid #fff;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
  &:hover input ~ .checkmark:after {
    display: block;
    border-color: ${(props) => props.theme.primaryRGBA(0.2)};
  }
  input:checked ~ .checkmark {
    background-color: ${(props) => props.theme.primary};
  }
  input:checked ~ .checkmark:after {
    display: block;
    border-color: #fff;
  }
`

const Error = styled.div`
  margin-bottom: 10px;
  font-size: 16px;
  color: rgba(255, 0, 0, 1);
`

export default () =>
  CreateForm({
    FormWrapper,
    SubmitButton,
    FieldGroup,
    CheckboxFieldGroup,
    Error,
    FindOutMore,
    enableFundedByCompany: false,
    enableComment: false,
    OptInCheckboxFieldGroup,
    formType: 'offer',
  })
