import { default as Fade } from 'react-reveal/Fade'
import { compose, pure, withState } from 'recompose'
import { React, Image, Link, styled, mq } from 'x'
import {
  Content,
  H2,
  H3,
  ButtonYellow,
  TextButtonUnderlined,
} from 'components/common'

import Check from 'static/svg/check.svg'
import Arrow from 'static/svg/arrow.svg'
import Shell from 'static/artifacts/shell.svg'
import LinesBlue from 'static/artifacts/lines-blue.svg'

const Container = styled.div`
  padding: 20px 0 60px 0;
  position: relative;
  overflow: hidden;
`

const Title = styled(H2)`
  text-align: ${(props) => props.align};
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
`

const Subtitle = styled(H3)`
  margin: 0 auto;
  text-align: ${(props) => props.align};
`

const Text = styled.p`
  margin: 0 auto;
  text-align: ${(props) => props.align};
  color: ${(props) => props.theme.primary};
  font-size: 16px;
  line-height: 24px;
`

const TwoColumnList = styled.div`
  margin: ${(props) => (props.compact ? '40px' : '60px')}
    ${(props) => (props.align === 'center' ? 'auto' : '0')}
    ${(props) => (props.compact ? '10px' : '20px')}
    ${(props) => (props.align === 'center' ? 'auto' : '0')};
  max-width: 920px;
  display: flex;
  justify-content: ${(props) => props.justifyContent};

  ${mq.below('md')} {
    flex-wrap: wrap;
    padding: 0 40px;
  }

  ${mq.below('sm')} {
    margin: ${(props) => (props.compact ? '20px' : '30px')}
      ${(props) => (props.align === 'center' ? 'auto' : '0')}
      ${(props) => (props.compact ? '10px' : '20px')}
      ${(props) => (props.align === 'center' ? 'auto' : '0')};
  }
`

const Column = styled.div`
  max-width: 50%;
  width: 50%;
  margin-right: ${(props) => (props.index === 0 ? '55px' : '0')};

  ${mq.below('md')} {
    width: 100%;
    max-width: 100%;
    margin-right: 0px;
  }
`

const ListItem = styled.div`
  font-size: ${(props) => (props.compact ? '16px' : '22px')};
  line-height: ${(props) => (props.compact ? '18px' : '28px')};
  font-weight: 400;
  color: ${(props) => props.theme.primary};
  margin: 0 0 20px ${(props) => (props.icon ? '55px' : '0')};
  text-align: left;
  fill: white;
  ${mq.below('lg')} {
    font-size: ${(props) => (props.compact ? '14px' : '18px')};
  }

  & > svg {
    fill: ${(props) => props.theme.secondary};
  }
`

const ListItemTitle = styled.div`
  margin-left: 41px;
`

const Aligned = styled.div`
  text-align: ${(props) => props.align};
`

const ShowMore = styled(TextButtonUnderlined)`
  display: inline-block;
  padding-right: 0;
  cursor: pointer;
`

const FeatureListButton = styled(ButtonYellow)`
  margin-top: ${(props) => (props.compact ? '20px' : '20px')};
`

const ArtifactA = styled.div`
  position: absolute;
  left: 120px;
  margin-top: 60px;
  z-index: 1;

  ${(props) => props.compact && 'display: none;'}

  ${mq.below('xl')} {
    display: none;
  }
`

const ArtifactB = styled.div`
  position: absolute;
  right: -110px;
  margin-top: 320px;
  z-index: 1;

  ${(props) => props.compact && 'display: none;'}

  ${mq.below('xl')} {
    display: none;
  }
`

const FeatureList = (props) => {
  // Props
  // - data (acf data from wordpress or other component)
  // - align
  // - compact (smaller rendering)
  if (props.data.items === null) {
    props.data.items = []
  }

  const cols = props.data.items.reduce(
    (result, item, index, items) => {
      return result[index < items.length / 2 ? 0 : 1].push(item), result
    },
    [[], []]
  )

  let ContainerElement = Container
  let ContentElement = Content
  if (props.noContainer) {
    ContainerElement = React.Fragment
    ContentElement = styled.div`
      padding-top: ${(props) => (props.containerPadding ? '70px' : '0')};
      max-width: 800px;
      margin: 0 auto;

      ${mq.below('sm')} {
        padding-top: 30px;
      }
    `
  }

  let compact = props.compact
  if (props.data.text) {
    compact = true
  }

  let justifyContent = 'center'
  if (props.align === 'left') {
    justifyContent = 'start'
  }

  const titleElement =
    props.data.titleElement && props.data.titleElement !== 'default'
      ? props.data.titleElement
      : 'h2'

  const subtitleElement =
    props.data.subtitleElement && props.data.subtitleElement !== 'default'
      ? props.data.subtitleElement
      : 'h3'
  return (
    <ContainerElement>
      <ArtifactA compact={compact}>
        <Shell width={120} />
      </ArtifactA>
      <ArtifactB compact={compact}>
        <LinesBlue width={230} />
      </ArtifactB>
      <ContentElement containerPadding={props.containerPadding}>
        {props.data.title && (
          <Title
            as={titleElement}
            line={!props.data.subtitle}
            align={props.align || 'center'}
          >
            {props.data.title}
          </Title>
        )}
        {props.data.subtitle && (
          <Subtitle as={subtitleElement} align={props.align || 'center'}>
            {props.data.subtitle}
          </Subtitle>
        )}
        {props.data.text && (
          <Text
            align={props.align || 'center'}
            dangerouslySetInnerHTML={{ __html: props.data.text }}
          />
        )}
        {props.data.items.length > 0 && (
          <TwoColumnList
            compact={compact}
            align={props.align || 'center'}
            justifyContent={justifyContent}
          >
            {cols.map((items, index) => (
              <Column index={index} key={index}>
                {items
                  .filter((item) => item.title)
                  .map((item, index) => (
                    <Fade key={index} delay={index * 100}>
                      <ListItem
                        key={item.title.replace(/\W/g, '-')}
                        compact={compact}
                      >
                        {item.icon && (
                          <Check
                            style={{
                              float: 'left',
                              position: 'relative',
                              top: '5px',
                            }}
                          />
                        )}
                        <ListItemTitle
                          icon={item.icon}
                          dangerouslySetInnerHTML={{ __html: item.title }}
                        />
                      </ListItem>
                    </Fade>
                  ))}
              </Column>
            ))}
          </TwoColumnList>
        )}
        <Aligned align={props.align || 'center'}>
          {props.data.ctaLabel && (
            <FeatureListButton to={props.data.ctaUrl} compact={compact ? 1 : 0}>
              {props.data.ctaLabel}
              <Arrow className="circle" />
            </FeatureListButton>
          )}
        </Aligned>
      </ContentElement>
    </ContainerElement>
  )
}

export default FeatureList
