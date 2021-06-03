import { compose, pure } from 'recompose'
import { React, styled, mq } from 'x'
import { Content, H2, H4, ButtonYellow } from 'components/common'

import Arrow from 'static/svg/arrow.svg'

const { below } = mq.createBreakpoints({
  siMD: '1050px',
  siLG: '1150px',
  siXL: '1200px',
  siXXL: '1600px',
})

const Container = styled.div`
  padding: 80px 0;

  ${mq.below('xl')} {
    padding: 60px 0;
  }
`

const SalaryContent = styled(Content)`
  padding: 0 20px;
`

const Title = styled(H2)`
  text-align: center;
  margin-bottom: 100px;
  margin-block-start: 0px;

  ${below('siLG')} {
    margin-bottom: 50px;
  }

  ${mq.below('sm')} {
    margin-bottom: 0;
  }
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 340px;

  ${below('siLG')} {
    flex-flow: column;
  }
`

const TitlesWrapper = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  max-width: 250px;

  ${below('siLG')} {
    display: none;
  }
`

const SalaryTitle = styled(H2)`
  font-size: 40px;
  margin: 33px 0;
`

const SalarySubtitle = styled(H4)`
  margin: 20px 0;
`

const SalaryIndication = styled.div`
  position: relative;
  flex: 1;
  padding: 0 20px;

  ${below('siLG')} {
    width: 80%;
    padding-top: 200px;
  }

  ${mq.below('lg')} {
    width: 90%;
  }

  ${mq.below('sm')} {
    padding-bottom: 130px;
  }
`

const Label = styled.span`
  position: absolute;
  left: ${(props) => (props.left ? '20px' : 'auto')};
  right: ${(props) => (props.left ? 'auto' : '20px')};
  margin-right: ${(props) => (props.left ? '0' : '5%')};
  bottom: 40px;
  text-transform: uppercase;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 1.2px;
  color: ${(props) => props.theme.primary};

  ${mq.below('sm')} {
    bottom: 170px;
  }
`

const Source = styled.div`
  color: ${(props) => props.theme.primaryRGBA(0.5)};
  font-size: 14px;
  text-align: center;
  position: absolute;
  left: 0;
  width: 100%;
  padding-top: 10px;

  ${mq.below('sm')} {
    font-size: 11px;
  }
`

const Bar = styled.div`
  width: 95%;
  height: 30px;
  border-radius: 15px;
  background-color: #d8d8d8;
`

const InnerBar = styled.div`
  position: absolute;
  height: 30px;
  background-color: ${(props) => props.theme.primary};
  left: 50%;
  transform: translateX(-50%);
  width: 75%;
  border-radius: 15px;

  ${below('siXL')} {
    width: 70%;
  }

  ${mq.below('lg')} {
    width: 68%;
  }

  ${mq.below('md')} {
    width: 65%;
  }

  ${mq.below('sm')} {
    width: 60%;
  }
`

const Centered = styled.div`
  margin-top: 60px;
  text-align: center;
`

const Roles = styled.div`
  position: absolute;
  left: 50%;
  bottom: 30px;
  width: 65%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-bottom: 26px;
  box-sizing: border-box;

  ${below('siXL')} {
    width: 62%;
  }

  ${mq.below('lg')} {
    width: 60%;
  }

  ${mq.below('md')} {
    width: 64%;
  }

  ${mq.below('sm')} {
    bottom: auto;
    top: 0;
    margin-bottom: 0;
    margin-top: 230px;
    align-items: start;
  }
`

const RoleInfo = styled.div``

const RoleLabel = styled.div`
  text-transform: uppercase;
  font-size: 8px;
  font-weight: 600;
  letter-spacing: 1.2px;
  text-align: center;
  line-height: 14px;
`

const RoleName = styled(RoleLabel)``

const RoleSalary = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.secondary};
  border-radius: ${(props) => (props.large ? '45px' : '25px')};
  width: ${(props) => (props.large ? '90px' : '50px')};
  height: ${(props) => (props.large ? '90px' : '50px')};
  font-size: ${(props) => (props.large ? '24px' : '15px')};
  font-weight: 600;
  color: #fff;
  margin: 8px auto 0;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    left: 50%;
    margin-left: -1px;
    width: 2px;
    height: 26px;
    bottom: -26px;
    background-color: ${(props) => props.theme.secondary};
  }
`

const Role = styled.div`
  position: ${(props) => (props.center ? 'absolute' : 'static')};
  bottom: ${(props) => (props.center ? '0' : 'auto')};
  left: ${(props) => (props.center ? '50%' : 'auto')};
  transform: translateX(${(props) => (props.center ? '-50%' : '0')});

  ${mq.below('sm')} {
    width: 100px;
    top: ${(props) => (props.center ? '0' : 'auto')};
    bottom: auto;
    padding-bottom: ${(props) => (props.center ? '56px' : '0')};
    transform: translate(
      ${(props) => (props.center ? '-50%' : '0')},
      ${(props) => (props.center ? '-100%' : '0')}
    );
  }

  & ${RoleInfo} {
    ${mq.below('sm')} {
      position: ${(props) => (props.center ? 'static' : 'absolute')};
      top: 84px;
      width: 100%;
    }
  }

  & ${RoleSalary} {
    ${mq.below('sm')} {
      top: ${(props) => (props.center ? 'auto' : '26px')};
      bottom: ${(props) => (props.center ? '0' : 'auto')};
      margin: ${(props) => (props.center ? '8px' : '0')} auto 0;

      &:after {
        bottom: ${(props) => (props.center ? '-26px' : 'auto')};
        top: ${(props) => (props.center ? 'auto' : '-26px')};
      }
    }
  }
`

const AverageSalary = styled.div`
  max-width: 250px;
`

const LargeAverageSalary = styled(SalaryTitle)`
  margin-top: 50px;
  margin-bottom: 10px;
  font-size: 70px;

  ${below('siLG')} {
    text-align: center;
  }

  ${mq.below('lg')} {
    font-size: 40px;
  }

  ${mq.below('sm')} {
    margin-top: 10px;
  }
`

const AverageSalaryText = styled.div`
  font-size: 16px;
  line-height: 28px;

  ${below('siLG')} {
    text-align: center;
  }
`

const shortFormatNumber = (lang, number, currency) =>
  (
    new Intl.NumberFormat(lang, {
      currency,
      style: 'currency',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(number / 1000) + 'k'
  ).replace(/[.,]0(k)$/, '$1')

const shortFormatCurrency = (lang, number, currency) =>
  (
    new Intl.NumberFormat(lang, {
      style: 'currency',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
      currency,
    }).format(number / 1000) + 'k'
  ).replace(/\.,]0(k)$/, '$1')

const enhance = compose(pure)

const SalaryIndicator = (props) => {
  const role1Salary = shortFormatNumber(
    props.post.language.hreflang,
    Math.round(props.data.role1Salary),
    props.post.language.currency
  )
  const role2Salary = shortFormatNumber(
    props.post.language.hreflang,
    Math.round(props.data.role2Salary),
    props.post.language.currency
  )
  const intAverage =
    (parseInt(props.data.role1Salary, 10) +
      parseInt(props.data.role2Salary, 10)) /
    2
  const shortAverage = shortFormatNumber(
    props.post.language.hreflang,
    intAverage,
    props.post.language.currency
  )
  const shortAverageCurrency = shortFormatCurrency(
    props.post.language.hreflang,
    intAverage,
    props.post.language.currency
  )
  const formattedAverage = new Intl.NumberFormat(props.post.language.hreflang, {
    style: 'currency',
    currency: props.post.language.currency,
  }).format(intAverage)

  const {
    siHigh,
    siYouCanEarn,
    siAverageSalary,
    siEarnAnAverage,
    siSalaryIndicator,
  } = props.globalData

  const formattedAverageString = siEarnAnAverage.replace('%d', formattedAverage)

  const titleElement =
    props.data.titleElement && props.data.titleElement !== 'default'
      ? props.data.titleElement
      : 'h2'

  const subtitleElement =
    props.data.subtitleElement && props.data.subtitleElement !== 'default'
      ? props.data.subtitleElement
      : 'h4'

  return (
    <Container>
      <SalaryContent>
        <Title line={true}>{siSalaryIndicator}</Title>
        <Wrapper>
          <TitlesWrapper>
            {props.data.subtitle && (
              <SalarySubtitle as={subtitleElement} line={true}>
                {props.data.subtitle}
              </SalarySubtitle>
            )}
            {props.data.title && (
              <SalaryTitle as={titleElement}>{props.data.title}</SalaryTitle>
            )}
          </TitlesWrapper>
          <SalaryIndication>
            <Roles>
              <Role>
                <RoleInfo>
                  <RoleLabel>{siAverageSalary}</RoleLabel>
                  <RoleName>{props.data.role1Name}</RoleName>
                </RoleInfo>
                <RoleSalary>{role1Salary}</RoleSalary>
              </Role>
              <Role center={true}>
                <RoleInfo>
                  <RoleLabel>{siAverageSalary}</RoleLabel>
                  <RoleName>{siYouCanEarn}</RoleName>
                </RoleInfo>
                <RoleSalary large={true}>{shortAverage}</RoleSalary>
              </Role>
              <Role>
                <RoleInfo>
                  <RoleLabel>{siAverageSalary}</RoleLabel>
                  <RoleName>{props.data.role2Name}</RoleName>
                </RoleInfo>
                <RoleSalary>{role2Salary}</RoleSalary>
              </Role>
            </Roles>
            <Label>{siHigh}</Label>
            <Bar>
              <InnerBar />
            </Bar>
            <Source>Source: Adzuna</Source>
          </SalaryIndication>
          <AverageSalary>
            <LargeAverageSalary>{shortAverageCurrency}</LargeAverageSalary>
            <AverageSalaryText>{formattedAverageString}</AverageSalaryText>
          </AverageSalary>
        </Wrapper>
        <Centered>
          <ButtonYellow to={props.data.ctaUrl}>
            {props.data.ctaLabel}
            <Arrow className="circle" />
          </ButtonYellow>
        </Centered>
      </SalaryContent>
    </Container>
  )
}

export default enhance(SalaryIndicator)
