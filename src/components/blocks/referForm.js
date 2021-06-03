import { React, styled, Yup, mq } from 'x'
import { Content, H3, ButtonYellow } from 'components/common'
import { Formik } from 'formik'
import { default as Cookies } from 'js-cookie'
import { useState, useRef } from 'react'

const Block = styled.div`
  background-color: #2a2e58;
  padding: 60px 0;
`

const StyledH3 = styled(H3)`
  color: #fff;
  font-size: 35px;
`

const FormWrapper = styled.div`
  width: 450px;
  max-width: 100%;
  margin: 0 auto;
`

const Form = styled.form``

const FieldGroup = styled.div`
  margin-bottom: 35px;

  label {
    display: block;
    font-size: 14px;
    font-weight: 600;
    line-height: 10px;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: #fff;
    margin-bottom: 18px;
  }

  input[type='text'],
  input[type='email'],
  input[type='tel'],
  textarea {
    padding: 15px 15px;
    background: #fff;
    border: none;
    border-bottom: 3px solid ${props => props.theme.primaryRGBA(0.2)};
    font-size: 15px;
    line-height: 26px;
    width: 100%;
    box-sizing: border-box;
  }

  input,
  textarea {
    outline: none;
  }

  input.error,
  textarea.error {
    border-color: rgba(255, 0, 0, 0.6);
  }

  ${mq.below('lg')} {
    box-sizing: border-box;
    width: 100%;
    padding: 0 15px 0 0;
  }
`

export const OptInCheckboxFieldGroup = styled(FieldGroup)`
  display: flex;
  flex-direction: column;
  padding-top: 8px;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 20px;
  padding-top: 0;

  label {
    position: relative;
    margin-bottom: 0;
    padding-left: 45px;
    line-height: 16px;
    text-transform: none;
    color: #fff;
    a {
      color: #fff;
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
    top: 4px;
    height: 25px;
    width: 25px;
    background-color: #fff;
  }
  .checkmark:after {
    content: '';
    position: absolute;
    display: none;
    left: 9px;
    top: 5px;
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
    border-color: ${props => props.theme.primaryRGBA(0.2)};
  }
  input:checked ~ .checkmark {
    background-color: ${props => props.theme.secondary};
  }
  input:checked ~ .checkmark:after {
    display: block;
    border-color: #fff;
  }
`

export const OptIn = styled.div`
  display: flex;
  flex-flow: column;
  padding-top: 10px;
`

const Error = styled.div`
  color: #fff;
  background: rgba(255, 0, 0, 0.6);
  padding: 10px;
`

const Center = styled.div`
  display: flex;
  justify-content: center;
`

const SubmitButton = styled(ButtonYellow)`
  margin-top: 35px;
  padding-right: 39px;
  ${mq.below('lg')} {
    padding-right: 20px;
  }
`

const formID = Math.random()
  .toString(36)
  .substr(2, 9)

const ReferForm = props => {
  const [prevent, setPrevent] = useState(true)
  const formRef = useRef(null)
  const formSubmit = (event, submitForm) => {
    if (prevent) {
      event.preventDefault()
      submitForm()
    }
  }
  const onSubmit = (values, formik) => {
    for (const [key, value] of Object.entries(values)) {
      // Checbox value, change to "on"
      if (value === true) {
        formik.setFieldValue(key, 'on')
      }
    }

    setTimeout(() => {
      setPrevent(false)
      formRef.current.submit()
    }, 1)
  }

  const overrides =
    {
      en: {
        submit:
          'https://forms.zohopublic.com/learningpeople/form/Referrallinkform/formperma/aDapOWTWXw8Wrk631u-cc8ncgN0sAUWUNKmRgbq75jw/htmlRecords/submit'
      },
      au: {
        submit:
          'https://forms.zohopublic.com/learningpeople1/form/Referrallinkform/formperma/1sJXtlFXyMtGsrbJs1-F4A4IKlYmMtXZM4_R01CPFGE/htmlRecords/submit',
        DecisionBox: 'DecisionBox1',
        DecisionBox1: 'DecisionBox2'
      }
    }[props.globalData.language.code] || {}

  const overrideOrDefault = name => overrides[name] || name

  return (
    <Block id="refer-form">
      <Content>
        <FormWrapper>
          <StyledH3>{props.data.title}</StyledH3>
          <Formik
            initialValues={{
              Name_First: '',
              Name_Last: '',
              Email: '',
              [overrideOrDefault('DecisionBox')]: false,
              [overrideOrDefault('DecisionBox1')]: false
            }}
            validationSchema={Yup.object().shape({
              Name_First: Yup.string()
              .trim()
              .required(
                props.globalData.contactRequiredFieldMessage.replace(
                    '%s',
                    `'${props.globalData.contactFirstName}'`
                )
              )
              .min(
                  2,
                  props.globalData.contactCharacterCheckMessage
                .replace('%s', `'${props.globalData.contactFirstName}'`)
                .replace('%d', 2)
              ),
              Name_Last: Yup.string()
              .trim()
              .required(
                props.globalData.contactRequiredFieldMessage.replace(
                    '%s',
                    `'${props.globalData.contactLastName}'`
                )
              )
              .min(
                  2,
                  props.globalData.contactCharacterCheckMessage
                .replace('%s', `'${props.globalData.contactLastName}'`)
                .replace('%d', 2)
              ),
              Email: Yup.string()
              .email(props.globalData.contactInvalidEmailMessage)
              .required(
                props.globalData.contactRequiredFieldMessage.replace(
                    '%s',
                    `'${props.globalData.contactEmail}'`
                )
              ),
              [overrideOrDefault('DecisionBox')]: Yup.string().test(
                'is-not-false',
                props.globalData.contactOptin1Required,
                value => value !== 'false'
              )
            })}
            onSubmit={onSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              submitForm,
              isSubmitting,
              setFieldValue
            }) => {
              const utmSource = Cookies.get('utm_source') || 'direct'
              const utmMedium = Cookies.get('utm_medium')
              const utmCampaign = Cookies.get('utm_campaign')
              const campaignId = Cookies.get('campaign_id')
              const gclid = Cookies.get('gclid')
              let gclidValue = ''
              if (gclid && gclid !== 'undefined' && gclid !== '-') {
                gclidValue = gclid
              }
              let referrer = ''
              if (typeof document !== 'undefined' && document.referrer) {
                referrer = document.referrer
              }
              return (
                <Form
                  action={overrideOrDefault('submit')}
                  method="post"
                  accept-charset="UTF-8"
                  enctype="multipart/form-data"
                  ref={formRef}
                  onSubmit={event => formSubmit(event, submitForm)}
                >
                  <input
                    type="hidden"
                    name="zf_referrer_name"
                    value={referrer}
                  />
                  <input
                    type="hidden"
                    name="zf_redirect_url"
                    value={props.data.redirectUrl}
                  />
                  <input type="hidden" name="zc_gad" value={gclid} />
                  <input type="hidden" name="utm_source" value={utmSource} />
                  <input type="hidden" name="utm_medium" value={utmMedium} />
                  <input
                    type="hidden"
                    name="utm_campaign"
                    value={utmCampaign}
                  />
                  <input
                    type="hidden"
                    name="campaign_id"
                    value={campaignId}
                  />
                  <input type="hidden" name="utm_term" value="" />
                  <input type="hidden" name="utm_content" value="" />
                  <FieldGroup>
                    <label htmlFor={`form-firstname-${formID}`}>
                      {props.data.firstnameLabel}
                    </label>
                    <input
                      id={`form-firstname-${formID}`}
                      type="text"
                      name="Name_First"
                      placeholder=""
                      minLength="2"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values['Name_First']}
                      className={
                        errors['Name_First'] && touched['Name_First']
                          ? 'error'
                          : ''
                      }
                    />
                    {errors['Name_First'] && touched['Name_First'] && (
                      <Error>{errors['Name_First']}</Error>
                    )}
                  </FieldGroup>
                  <FieldGroup>
                    <label htmlFor={`form-lastname-${formID}`}>
                      {props.data.lastnameLabel}
                    </label>
                    <input
                      id={`form-lastname-${formID}`}
                      type="text"
                      name="Name_Last"
                      placeholder=""
                      minLength="2"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values['Name_Last']}
                      className={
                        errors['Name_Last'] && touched['Name_Last']
                          ? 'error'
                          : ''
                      }
                    />
                    {errors['Name_Last'] && touched['Name_Last'] && (
                      <Error>{errors['Name_Last']}</Error>
                    )}
                  </FieldGroup>
                  <FieldGroup>
                    <label htmlFor={`form-email-${formID}`}>
                      {props.data.emailLabel}
                    </label>
                    <input
                      id={`form-email-${formID}`}
                      type="email"
                      name="Email"
                      placeholder=""
                      minLength="2"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values['Email']}
                      className={
                        errors['Email'] && touched['Email'] ? 'error' : ''
                      }
                    />
                    {errors['Email'] && touched['Email'] && (
                      <Error>{errors['Email']}</Error>
                    )}
                  </FieldGroup>
                  <OptIn>
                    <OptInCheckboxFieldGroup>
                      <label htmlFor={`checkbox-optin1-${formID}`}>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: props.globalData.contactOptin1
                          }}
                        />
                        <input
                          id={`checkbox-optin1-${formID}`}
                          type="checkbox"
                          name={overrideOrDefault('DecisionBox')}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values[overrideOrDefault('DecisionBox')]}
                        />
                        <span className="checkmark" />
                      </label>
                      {errors[overrideOrDefault('DecisionBox')] &&
                        touched[overrideOrDefault('DecisionBox')] && (
                          <Error>
                            {errors[overrideOrDefault('DecisionBox')]}
                          </Error>
                        )}
                    </OptInCheckboxFieldGroup>
                    <OptInCheckboxFieldGroup>
                      <label htmlFor={`checkbox-optin2-${formID}`}>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: props.globalData.contactOptin2
                          }}
                        />
                        <input
                          id={`checkbox-optin2-${formID}`}
                          type="checkbox"
                          name={overrideOrDefault('DecisionBox1')}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values[overrideOrDefault('DecisionBox1')]}
                        />
                        <span className="checkmark" />
                      </label>
                    </OptInCheckboxFieldGroup>
                  </OptIn>
                  <Center>
                    <SubmitButton
                      as="button"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {props.data.submitLabel}
                    </SubmitButton>
                  </Center>
                </Form>
              )
            }}
          </Formik>
        </FormWrapper>
      </Content>
    </Block>
  )
}

export default ReferForm
