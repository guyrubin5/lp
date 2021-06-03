import { Formik } from 'formik'
import { ButtonBlue } from 'components/common'
import { default as Cookies } from 'js-cookie'
import { React, styled, Yup, mq } from 'x'
import {
  compose,
  lifecycle,
  pure,
  withHandlers,
  withState,
  withProps,
} from 'recompose'
import ip from 'library/ip'

import 'react-phone-number-input/style.css'
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'
import {
  getCountries,
  getCountryCallingCode,
} from 'react-phone-number-input/input'
import en from 'react-phone-number-input/locale/en.json'

import Arrow from '../static/svg/arrow.svg'

const DefaultFormWrapper = styled.form`
  display: flex;
  flex-flow: wrap;
  width: calc(100% + 50px);

  .PhoneInputCountry {
    background: #fff;
    padding: 15px;
    border-bottom: 3px solid ${(props) => props.theme.primaryRGBA(0.2)};

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

  .PhoneInputCountryIcon--border {
    border: none;
    box-shadow: none;
  }
`

const DefaultSubmitButton = styled(ButtonBlue)`
  margin-top: 35px;
`

const DefaultFieldGroup = styled.div`
  width: ${(props) => (props.fullWidth ? '100%' : 'calc(50% - 50px)')};
  margin-right: 50px;
  margin-bottom: 35px;

  label {
    display: block;
    font-size: 14px;
    font-weight: 600;
    line-height: 10px;
    letter-spacing: 1.2px;
    text-transform: uppercase;
    color: ${(props) => props.theme.primary};
    margin-bottom: 18px;
  }

  input[type='text'],
  input[type='email'],
  input[type='tel'],
  textarea {
    padding: 15px 15px;
    background: #fff;
    border: none;
    border-bottom: 3px solid ${(props) => props.theme.primaryRGBA(0.2)};
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

export const DefaultFieldHeader = styled.p`
  position: relative;
  line-height: 16px;
  display: block;
  width: 100%;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  color: ${(props) => props.theme.primary};
  margin-bottom: 28px;
`

const BusinessEnquiry = styled.div`
  ${DefaultFieldHeader} {
    margin-bottom: 20px;
  }
`

export const DefaultRadioFieldGroup = styled(DefaultFieldGroup)`
  display: flex;
  align-items: center;
  padding-top: 8px;
  position: relative;
  box-sizing: border-box;

  label {
    position: relative;
    margin-bottom: 0;
    padding-left: 45px;
    line-height: 16px;
    margin-right: 40px;
  }
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  .bullet {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 30px;
    width: 30px;
    background-color: #fff;
    border-radius: 20px;
  }
  .bullet:after {
    content: '';
    position: absolute;
    display: none;
    left: 8px;
    top: 8px;
    width: 14px;
    height: 14px;
    border-radius: 20px;
    background-color: ${(props) => props.theme.primary};
  }
  label:hover input ~ .bullet:after {
    display: block;
    background-color: ${(props) => props.theme.primaryRGBA(0.2)};
  }
  label input:checked ~ .bullet {
    background-color: ${(props) => props.theme.primary};
  }
  label input:checked ~ .bullet:after {
    display: block;
    background-color: #fff;
  }
`

export const DefaultCheckboxFieldGroup = styled(DefaultFieldGroup)`
  display: flex;
  align-items: center;
  padding-top: 8px;
  position: relative;
  box-sizing: border-box;

  label {
    position: relative;
    margin-bottom: 0;
    padding-left: 45px;
    line-height: 16px;
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

export const DefaultOptInCheckboxFieldGroup = styled(DefaultFieldGroup)`
  display: flex;
  flex-direction: column;
  padding-top: 8px;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 0;
  padding-top: 0;

  label {
    position: relative;
    margin-bottom: 0;
    padding-left: 45px;
    line-height: 16px;
    text-transform: none;
    color: #fff;
    a {
      color: ${(props) => props.theme.primary};
      text-decoration: underline;
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

const DefaultError = styled.div`
  color: #fff;
  background: rgba(255, 0, 0, 0.6);
  padding: 10px;
`

export const OptIn = styled.div`
  display: flex;
  flex-flow: column;
  padding-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.7);
`

const flags = {}
getCountries().forEach((country) => {
  flags[country] = () => <span>+{getCountryCallingCode(country)}</span>
})

const labels = {}
getCountries().forEach((country) => {
  labels[country] = `${en[country]} (+${getCountryCallingCode(country)})`
})

const defaults = {
  FormWrapper: DefaultFormWrapper,
  SubmitButton: DefaultSubmitButton,
  FieldGroup: DefaultFieldGroup,
  Error: DefaultError,
  CheckboxFieldGroup: DefaultCheckboxFieldGroup,
  OptInCheckboxFieldGroup: DefaultOptInCheckboxFieldGroup,
  FieldHeader: DefaultFieldHeader,
  enableFundedByCompany: true,
  enableComment: false,
  RadioFieldGroup: DefaultRadioFieldGroup,
  formType: '',
}

export const CreateForm = (params) => {
  const {
    FormWrapper,
    SubmitButton,
    FieldGroup,
    Error,
    CheckboxFieldGroup,
    FindOutMore,
    enableFundedByCompany,
    enableComment,
    OptInCheckboxFieldGroup,
    FieldHeader,
    RadioFieldGroup,
  } = Object.assign(defaults, params)

  const enhance = compose(
    pure,
    withState('prevent', 'setPrevent', true),
    withState('ipData', 'setIP', undefined),
    withProps({ formID: Math.random().toString(36).substr(2, 9) }),
    withHandlers(() => {
      let formRef
      return {
        registerChild: () => (ref) => {
          formRef = ref
        },
        formSubmit: (props) => (event, submitForm) => {
          // Only pass through Formik if prevent state is true
          if (props.prevent) {
            event.preventDefault()
            submitForm()
          }
        },
        onSubmit: (props) => async (values, formik) => {
          const {
            'Email': em,
            'First Name': fn,
            'Last Name': ln,
            '_Mobile': ph,
          } = values


          dataLayer.push({
            em,
            fn,
            ln,
            ph,
          })

          // TODO _gaq.push(['_trackEvent', 'enquiry', this.getAttribute('data-formId')]);

          for (const [key, value] of Object.entries(values)) {
            // Checbox value, change to "on"
            if (value === true) {
              formik.setFieldValue(key, 'on')
            }
          }

          formik.setFieldValue(
            'LEADCF14',
            `http://www.ip-adress.com/ip_tracer/${props.ipData.ip}`,
            false
          )
          formik.setFieldValue('Mobile', values._Mobile, false)

          // Coming here means form validation is successful
          // Disable setPrevent so form submission is not prevented and resubmit form, browser will handle the rest
          setTimeout(() => {
            props.setPrevent(false)
            formRef.submit()
          }, 100)
        },
      }
    }),
    lifecycle({
      componentDidMount() {
        // In case of offerForm load ip and set returned promise globally on window so it only happens once
        if (this.props.isShown === undefined) {
          if (!window.load_ip) {
            window.load_ip = ip()
          }

          let setIP = this.props.setIP
          window.load_ip.then((data) => {
            setIP(data)
          })
        }
      },
      componentDidUpdate(prevProps) {
        if (this.props.isShown && !prevProps.isShown) {
          let setIP = this.props.setIP
          ip().then((data) => {
            // c onsole.log('got data', data)
            setIP(data)
          })
        }
      },
    })
  )

  const Form = (props) => {
    const formID = props.formID

    const fieldNameOverrides =
      {
        en: {
          LEADCF10: '',
        },
        au: {
          LEADCF4: 'LEADCF2',
          LEADCF5: 'LEADCF4',
          LEADCF6: 'LEADCF3',
          LEADCF7: 'LEADCF1',
          LEADCF14: 'LEADCF10',
          LEADCF10: '',
          LEADCF133: 'LEADCF109',
          LEADCF137: 'LEADCF104',
          LEADCF104: 'LEADCF103',
          LEADCF134: 'LEADCF108',
          LEADCF106: 'LEADCF110',
          LEADCF105: 'LEADCF101',
          LEADCF135: 'LEADCF107',
          LEADCF188: 'LEADCF28',
          LEADCF241: 'LEADCF105',
          LEADCF244: 'LEADCF131',

          LEADCF316: 'LEADCF36',

        },
      }[props.globalData.language.code] || {}

    const overrideOrDefault = (name) => fieldNameOverrides[name] || name

    return (
      <Formik
        initialValues={{
          'First Name': '',
          'Last Name': '',
          Email: '',
          _Mobile: '',
          Mobile: '',
          Phone: '',
          [overrideOrDefault('LEADCF188')]: '',
          [overrideOrDefault('LEADCF133')]: false,
          [overrideOrDefault('LEADCF14')]: '',
          [overrideOrDefault('LEADCF137')]: false,
          [overrideOrDefault('LEADCF104')]: false,
          [overrideOrDefault('LEADCF134')]: false,
          [overrideOrDefault('LEADCF106')]: false,
          [overrideOrDefault('LEADCF105')]: false,
          [overrideOrDefault('LEADCF135')]: false,
          [overrideOrDefault('LEADCF241')]: false,
          [overrideOrDefault('LEADCF244')]: false,

          [overrideOrDefault('LEADCF316')]: '',
        }}
        validationSchema={Yup.object().shape({
          'First Name': Yup.string()
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
          'Last Name': Yup.string()
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
          _Mobile: Yup.string()
          .trim()
          .required(
            props.globalData.contactRequiredFieldMessage.replace(
                '%s',
                `'${props.globalData.contactMobileNumber}'`
            )
          )
          .test(
              'is-valid-number',
              props.globalData.contactInvalidPhoneNumber,
            (value) => isValidPhoneNumber(value)
          ),
          [overrideOrDefault('LEADCF241')]: Yup.string().test(
            'is-not-false',
            props.globalData.contactOptin1Required,
            (value) => value !== 'false'
          ),
        })}
        onSubmit={props.onSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          submitForm,
          isSubmitting,
          setFieldValue,
        }) => {
          const formId = props.globalData.zohoFormId
          const salesIq = props.globalData.zohoSalesIq
          const extraField = props.globalData.zohoExtraFormField
          let thankYouPage = `${props.globalData.siteUrl}${props.globalData.thankYouPageUrl}`
          thankYouPage += `?email=${encodeURIComponent(values['Email'])}`
          thankYouPage += `&firstname=${encodeURIComponent(
            values['First Name']
          )}`
          thankYouPage += `&lastname=${encodeURIComponent(values['Last Name'])}`
          thankYouPage += `&phone=${encodeURIComponent(values['Mobile'])}`

          const utmSource = Cookies.get('utm_source') || 'direct'
          const utmMedium = Cookies.get('utm_medium')
          const utmCampaign = Cookies.get('utm_campaign')
          const gclid = Cookies.get('gclid')

          const campaignId = Cookies.get('campaign_id')

          let gclidValue = ''
          if (gclid && gclid !== 'undefined' && gclid !== '-') {
            gclidValue = gclid
          }

          const leadFields = {
            five: '',
            six: '',
            seven: '',
          }

          if (utmSource) {
            leadFields.five = utmSource
            leadFields.six = utmMedium
            leadFields.seven = utmCampaign
          }

          return (
            <FormWrapper
              className="fmt-form contact-form"
              ref={props.registerChild}
              action={'https://crm.zoho.com/crm/WebToLeadForm'}
              name={salesIq}
              method="post"
              data-formid={formId}
              onSubmit={(event) => props.formSubmit(event, submitForm)}
              siq_id={`autopick_9257-${formID}`}
            >
              {FindOutMore && (
                <FindOutMore>{props.globalData.stringFindOutMore}</FindOutMore>
              )}
              <input
                type="hidden"
                name={overrideOrDefault('LEADCF4')}
                value={props.globalData.pageTitle}
                readOnly
              />
              <input
                type="hidden"
                name={overrideOrDefault('LEADCF5')}
                value={leadFields.five}
                readOnly
              />
              <input
                type="hidden"
                name={overrideOrDefault('LEADCF6')}
                value={leadFields.six}
                readOnly
              />
              <input
                type="hidden"
                name={overrideOrDefault('LEADCF7')}
                value={leadFields.seven}
                readOnly
              />
              <input
                type="hidden"
                name={overrideOrDefault('LEADCF316')}
                value={campaignId}
                readOnly
              />
              <input type="hidden" name="term" value="-" readOnly />
              <input type="hidden" name="content" value="-" readOnly />
              <input type="hidden" name="segment" value="(not+set)" readOnly />
              <input
                type="hidden"
                name="xnQsjsdp"
                value={extraField}
                readOnly
              />
              <input
                type="hidden"
                id={`zc_gad-${formID}`}
                name="zc_gad"
                value=""
                readOnly
              />
              <input type="hidden" name="xmIwtLD" value={formId} readOnly />
              <input
                type="hidden"
                name="actionType"
                value="TGVhZHM="
                readOnly
              />
              <input
                type="hidden"
                name="returnURL"
                value={thankYouPage}
                readOnly
              />
              <input type="hidden" name="Lead Status" value="Fresh" readOnly />
              {fieldNameOverrides['LEADCF10'] !== '' && (
                <input
                  type="hidden"
                  name={overrideOrDefault('LEADCF10')}
                  value="learningpeople.com"
                  readOnly
                />
              )}
              <input type="hidden" name="LEADCF13" value="" readOnly />
              <input
                type="hidden"
                name={overrideOrDefault('LEADCF14')}
                value={values['LEADCF14']}
                readOnly
              />
              <input
                type="hidden"
                name="LEADCF40"
                value=""
                id={`ipcountry-${formID}`}
                readOnly
              />
              <input
                type="hidden"
                name="LEADCF171"
                value={gclidValue}
                readOnly
              />

              <FieldGroup>
                <label htmlFor={`form-firstname-${formID}`}>
                  {props.globalData.contactFirstName}
                </label>
                <input
                  id={`form-firstname-${formID}`}
                  type="text"
                  name="First Name"
                  placeholder=""
                  minLength="2"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values['First Name']}
                  className={
                    errors['First Name'] && touched['First Name'] ? 'error' : ''
                  }
                />
                {errors['First Name'] && touched['First Name'] && (
                  <Error>{errors['First Name']}</Error>
                )}
              </FieldGroup>
              <FieldGroup>
                <label htmlFor={`form-surname-${formID}`}>
                  {props.globalData.contactLastName}
                </label>
                <input
                  id={`form-surname-${formID}`}
                  type="text"
                  name="Last Name"
                  placeholder=""
                  minLength="2"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values['Last Name']}
                  className={
                    errors['Last Name'] && touched['Last Name'] ? 'error' : ''
                  }
                />
                {errors['Last Name'] && touched['Last Name'] && (
                  <Error>{errors['Last Name']}</Error>
                )}
              </FieldGroup>
              <FieldGroup>
                <label htmlFor={`form-email-${formID}`}>
                  {props.globalData.contactEmail}
                </label>
                <input
                  id={`form-email-${formID}`}
                  type="email"
                  name="Email"
                  placeholder=""
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.Email}
                  className={errors.Email && touched.Email ? 'error' : ''}
                />
                {errors.Email && touched.Email && <Error>{errors.Email}</Error>}
              </FieldGroup>
              <FieldGroup>
                <label htmlFor={`form-mobile-${formID}`}>
                  {props.globalData.contactMobileNumber}
                </label>
                <input type="hidden" name="Mobile" value={values.Mobile} />
                <PhoneInput
                  placeholder={props.globalData.contactPreferredNumber}
                  name="_Mobile"
                  flags={flags}
                  labels={labels}
                  defaultCountry={
                    props.ipData?.country_code
                      ? props.ipData.country_code
                      : props.post?.language?.code
                        ? props.post.language.code === 'en'
                          ? 'GB'
                          : 'AU'
                        : null
                  }
                  onChange={(value) => {
                    setFieldValue('_Mobile', value, true)
                  }}
                  onBlur={handleBlur}
                  value={values._Mobile}
                  className={errors._Mobile && touched._Mobile ? 'error' : ''}
                />
                {errors._Mobile && touched._Mobile && (
                  <Error>{errors._Mobile}</Error>
                )}
              </FieldGroup>
              {/*<FieldGroup>*/}
              {/*  <label htmlFor={`form-telephone-${formID}`}>{ props.globalData.contactLandlineNumber }</label>*/}
              {/*  <input id={`form-telephone-${formID}`}*/}
              {/*         type="tel"*/}
              {/*         name="Phone"*/}
              {/*         placeholder={ props.globalData.contactIncAreaAndCountryCode }*/}
              {/*         onChange={ handleChange }*/}
              {/*         onBlur={ handleBlur }*/}
              {/*         value={ values.Phone }*/}
              {/*  />*/}
              {/*</FieldGroup>*/}
              {enableComment && (
                <FieldGroup fullWidth>
                  <label htmlFor={`form-comment-${formID}`}>
                    {props.globalData.contactComment}
                  </label>
                  <textarea
                    id={`form-comment-${formID}`}
                    type="text"
                    name={overrideOrDefault('LEADCF188')}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values[overrideOrDefault('LEADCF188')]}
                    className={
                      errors[overrideOrDefault('LEADCF188')] &&
                      touched[overrideOrDefault('LEADCF188')]
                        ? 'error'
                        : ''
                    }
                  />
                  {errors[overrideOrDefault('LEADCF188')] &&
                    touched[overrideOrDefault('LEADCF188')] && (
                      <Error>{errors[overrideOrDefault('LEADCF188')]}</Error>
                    )}
                </FieldGroup>
              )}
              <FieldHeader>
                {props.globalData.contactSelectAllThatApply}
              </FieldHeader>
              <CheckboxFieldGroup>
                <label htmlFor={`checkbox-new-career-${formID}`}>
                  {props.globalData.contactNewCareer}
                  <input
                    id={`checkbox-new-career-${formID}`}
                    type="checkbox"
                    name={overrideOrDefault('LEADCF137')}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values[overrideOrDefault('LEADCF137')]}
                  />
                  <span className="checkmark" />
                </label>
              </CheckboxFieldGroup>
              <CheckboxFieldGroup>
                <label htmlFor={`checkbox-affected-by-covid-${formID}`}>
                  {props.globalData.contactAffectedByCovid}
                  <input
                    id={`checkbox-affected-by-covid-${formID}`}
                    type="checkbox"
                    name={overrideOrDefault('LEADCF104')}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values[overrideOrDefault('LEADCF104')]}
                  />
                  <span className="checkmark" />
                </label>
              </CheckboxFieldGroup>
              <CheckboxFieldGroup>
                <label htmlFor={`checkbox-job-security-${formID}`}>
                  {props.globalData.contactBetterJobSecurity}
                  <input
                    id={`checkbox-job-security-${formID}`}
                    type="checkbox"
                    name={overrideOrDefault('LEADCF134')}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values[overrideOrDefault('LEADCF134')]}
                  />
                  <span className="checkmark" />
                </label>
              </CheckboxFieldGroup>
              <CheckboxFieldGroup>
                <label htmlFor={`checkbox-furloughed-${formID}`}>
                  {props.globalData.contactFurloughed}
                  <input
                    id={`checkbox-furloughed-${formID}`}
                    type="checkbox"
                    name={overrideOrDefault('LEADCF106')}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values[overrideOrDefault('LEADCF106')]}
                  />
                  <span className="checkmark" />
                </label>
              </CheckboxFieldGroup>
              <CheckboxFieldGroup>
                <label htmlFor={`checkbox-enhance-skills-${formID}`}>
                  {props.globalData.contactEnhanceSkills}
                  <input
                    id={`checkbox-enhance-skills-${formID}`}
                    type="checkbox"
                    name={overrideOrDefault('LEADCF105')}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values[overrideOrDefault('LEADCF105')]}
                  />
                  <span className="checkmark" />
                </label>
              </CheckboxFieldGroup>
              <CheckboxFieldGroup>
                <label htmlFor={`checkbox-technology-${formID}`}>
                  {props.globalData.contactTechnologyRole}
                  <input
                    id={`checkbox-technology-${formID}`}
                    type="checkbox"
                    name={overrideOrDefault('LEADCF135')}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values[overrideOrDefault('LEADCF135')]}
                  />
                  <span className="checkmark" />
                </label>
              </CheckboxFieldGroup>
              {enableFundedByCompany && (
                <BusinessEnquiry>
                  <FieldHeader>
                    {props.globalData.contactBusinessEnquiry}
                  </FieldHeader>
                  <RadioFieldGroup>
                    <label htmlFor={`radio-yes-${formID}`}>
                      {props.globalData.contactBusinessEnquiryYes}
                      <input
                        id={`radio-yes-${formID}`}
                        type="radio"
                        name={overrideOrDefault('LEADCF133')}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value="on"
                      />
                      <span className="bullet" />
                    </label>
                    <label htmlFor={`radio-no-${formID}`}>
                      {props.globalData.contactBusinessEnquiryNo}
                      <input
                        id={`radio-no-${formID}`}
                        type="radio"
                        name={overrideOrDefault('LEADCF133')}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={false}
                      />
                      <span className="bullet" />
                    </label>
                  </RadioFieldGroup>
                </BusinessEnquiry>
              )}
              <OptIn>
                <OptInCheckboxFieldGroup>
                  <label htmlFor={`checkbox-optin1-${formID}`}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: props.globalData.contactOptin1,
                      }}
                    />
                    <input
                      id={`checkbox-optin1-${formID}`}
                      type="checkbox"
                      name={overrideOrDefault('LEADCF241')}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values[overrideOrDefault('LEADCF241')]}
                    />
                    <span className="checkmark" />
                  </label>
                  {errors[overrideOrDefault('LEADCF241')] &&
                    touched[overrideOrDefault('LEADCF241')] && (
                      <Error>{errors[overrideOrDefault('LEADCF241')]}</Error>
                    )}
                </OptInCheckboxFieldGroup>
                <OptInCheckboxFieldGroup>
                  <label htmlFor={`checkbox-optin2-${formID}`}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: props.globalData.contactOptin2,
                      }}
                    />
                    <input
                      id={`checkbox-optin2-${formID}`}
                      type="checkbox"
                      name={overrideOrDefault('LEADCF244')}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values[overrideOrDefault('LEADCF244')]}
                    />
                    <span className="checkmark" />
                  </label>
                </OptInCheckboxFieldGroup>
              </OptIn>
              <SubmitButton
                as="button"
                type="submit"
                disabled={isSubmitting}
                className={
                  do {
                    const formType = props.formType || params.formType
                    // c onsole.log('formType', formType)
                    if (formType === 'bubble')
                      'submit-contact-bubble'
                    else if (formType === 'contactUs')
                      'submit-contact-us'
                    else if (formType === 'offer')
                      `submit-offer-form`
                    else
                      `submit-${ formType }`
                  }
                }
              >
                {props.globalData.contactSubmit}
                <Arrow className="circle" />
              </SubmitButton>
            </FormWrapper>
          )
        }}
      </Formik>
    )
  }

  return enhance(Form)
}

export default CreateForm()
