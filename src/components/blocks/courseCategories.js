import { Parallax } from 'react-scroll-parallax'
import { compose, pure } from 'recompose'
import { React, Link, Image, styled, mq } from 'x'
import { Content, H2, TextButtonUnderlinedWhite } from 'components/common'

import Arrow from 'static/svg/arrow.svg'

const { below, above } = mq.createBreakpoints({
  custom: '620px',
})

const Container = styled.div`
  padding: 100px 0;
  position: relative;
  /*
  background: radial-gradient(circle at center, rgba(16,16,16,.70) 50%, transparent 140%), url(${(
    props
  ) => props.image}) center;
  background-size: cover;
  */

  ${mq.below('sm')} {
    padding: 60px 0;
  }
`

const Background = styled.div`
  position: absolute;
  overflow: hidden;
  z-index: 1;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

const Overlay = styled.div`
  background-image: radial-gradient(
    circle at center,
    rgba(16, 16, 16, 0.7) 50%,
    transparent 140%
  );
  z-index: 2;
  position: absolute;
  top: -50px;
  right: 0;
  bottom: -50px;
  left: 0;
`

const CategoryContent = styled(Content)`
  position: relative;
  z-index: 3;
  ${below('custom')} {
    padding: 0;

    &:before {
      content: '${(props) => props.titleContent.replace('"', '"')}';
      display: block;
      font-weight: 700;
      line-height: 60px;
      font-size: 50px;

      width: 80%;
      margin: 0 5%;
      color: #fff;
      box-sizing: border-box;
      padding: 0 30px 0 31px;
      text-align: center;
      visibility: hidden;

      ${mq.below('lg')} {
        line-height: normal;
        font-size: 40px;
      }
      ${mq.below('md')} {
        line-height: normal;
        font-size: 35px;
        visibility: visible;
      }
      ${mq.below('sm')} {
        line-height: normal;
        font-size: 30px;
        visibility: visible;
      }
    }
  }
`

const TitleContainer = styled.div`
  float: left;
  z-index: 2;
  position: relative;
`

const Title = styled(H2)`
  color: #fff;
  margin-top: 0;
  ${below('custom')} {
    text-align: center;
  }
`

const Categories = styled.div`
  display: flex;
  flex-wrap: wrap;

  ${below('custom')} {
    padding-top: 30px;
    flex-wrap: nowrap;
    width: 100%;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;

    scroll-snap-type: x mandatory;
    scroll-padding: 0 30px;

    &:after {
      content: '';
      flex: 0 0 1px;
    }
  }
`

const CategoryButton = styled.div`
  color: #fff;
  background: ${(props) => props.theme.secondary};
  display: inline-block;
  box-sizing: border-box;
  height: 50px;
  line-height: 50px;
  white-space: nowrap;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 11px;
  letter-spacing: 1.2px;
  padding: 0 67px 0 20px;
  position: absolute;
  bottom: 0;
  z-index: 2;

  .circle {
    fill: #fff;
    background-color: rgba(255, 255, 255, 0.16);
    position: absolute;
    top: 50%;
    margin-top: -16px;
    width: 13px;
    height: 13px;
    padding: 10px;
    border-radius: 30px;
    right: 20px;
  }

  ${below('custom')} {
    bottom: 30px;
    width: calc(100% - 60px);
  }

  & svg {
    transition: transform 0.3s;
  }

  &:hover {
    & svg {
      transform: translateX(10px);
    }
  }
`

const CategoryTitle = styled.div`
  font-size: 24px;
  font-weight: 700;
  line-height: 30px;
  color: #fff;
  position: relative;
  padding-bottom: 30px;
  margin-bottom: 30px;
  margin-top: 5px;
  z-index: 2;
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 20px;
    height: 2px;
    background-color: ${(props) => props.theme.secondary};
  }

  ${below('custom')} {
    color: ${(props) => props.theme.primary};
  }
`

const CategorySummary = styled.div`
  color: #fff;
  font-size: 18px;
  line-height: 21px;
  z-index: 2;
  position: relative;

  ${below('custom')} {
    color: ${(props) => props.theme.primary};
  }
`

const TitleReadMoreButton = styled(TextButtonUnderlinedWhite)`
  ${below('custom')} {
    display: none;
  }
`

const Category = styled(({ isFirst, isLast, isTitle, ...props }) => (
  <Link {...props}>{props.children}</Link>
))`
  display: block;
  border-left: ${(props) => (props.isTitle ? 'none' : '1px solid #FFF')};
  padding: 0 30px ${(props) => (props.isTitle ? 0 : '70px')}
    ${(props) => (props.isTitle ? '31px' : '30px')};
  box-sizing: border-box;
  position: relative;
  max-width: 33%;
  margin-top: 40px;
  margin-bottom: 40px;

  scroll-snap-align: start;
  z-index: 2;
  transition: all 0.1s;

  ${(props) =>
    !props.isTitle &&
    `
    ::after {
      content: "";
      opacity: 0;
      position: absolute;
      top: 1px;
      left: 1px;
      right: 1px;
      bottom: 1px;
      background: #fff;
      z-index: 1;
      transition: opacity .05s;
    }
  `}

  ${above('custom')} {
    &:hover {
      ${(props) =>
        !props.isTitle &&
        `
        box-shadow: rgba(0, 0, 0, .6) 0 0 18px 5px;
        background: #fff;
        transform: scale(1.05);

        ::after {
          opacity: 1;
          top: -20px;
          left: -5px;
          right: -1px;
          bottom: -20px;
        }
      `}

      ${CategorySummary} {
        color: ${(props) => props.theme.primary};
      }

      ${CategoryButton} {
        background: #f3c378;
        color: #fff;
      }

      ${CategoryTitle} {
        color: ${(props) => props.theme.primary};
      }
    }
  }

  ${mq.below('lg')} {
    max-width: 50%;
  }

  ${below('custom')} {
    ${(props) => (props.isTitle ? '&' : '> none')} {
      display: none;
      //position: absolute;
      //top: 0;
      //max-width: none;
      //width: 80%;
      //margin: 0 5%;
    }
    ${(props) => (props.isTitle ? '> none' : '&')} {
      max-width: none;
      top: 0;
      flex: 0 0 80%;
      background: #fff;
      border: none;
      margin: 0 ${(props) => (props.isLast ? '5%' : '2.5%')} 0
        ${(props) => (props.isFirst ? '5%' : '2.5%')};
      padding: 30px 30px 90px;
    }
  }
`

const enhance = compose(pure)

const isSmall = typeof window !== 'undefined' && window.innerWidth <= 960
const Empty = styled.div``
const Parallaxer = isSmall ? Empty : Parallax

const CourseCategories = (props) => {
  const titleElement =
    props.data.titleElement && props.data.titleElement !== 'default'
      ? props.data.titleElement
      : 'h2'
  return (
    <Container>
      <Background>
        <Parallaxer
          slowerScrollRate
          offsetYMin={-50}
          offsetYMax={50}
          styleOuter={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          }}
          styleInner={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        >
          <Overlay />
          <Image
            fluid={props.data.backgroundImage.file.sharp.fluid}
            style={{
              position: 'absolute',
              top: '-50px',
              right: 0,
              bottom: '-50px',
              left: 0,
            }}
          />
        </Parallaxer>
      </Background>
      <CategoryContent titleContent={props.data.title}>
        <Categories>
          <Category isTitle={true} as="div">
            <TitleContainer>
              <Title as={titleElement}>{props.data.title}</Title>
              <TitleReadMoreButton
                to={props.globalData.formatLink(props.data.overview.link)}
              >
                {props.globalData.stringFindOutMore}
                <Arrow className="arrow" />
              </TitleReadMoreButton>
            </TitleContainer>
          </Category>
          {props.data.categories.map((category, index) => (
            <Category
              to={props.globalData.formatLink(category.link)}
              key={category.id}
              isFirst={index === 0 ? 1 : 0}
              isLast={index === props.data.categories.length - 1 ? 1 : 0}
            >
              <CategoryTitle className="category-title">
                {category.title}
              </CategoryTitle>
              <CategorySummary
                dangerouslySetInnerHTML={{ __html: category.acf.summary }}
              />
              <CategoryButton className="category-cta">
                {props.globalData.stringFindOutMore}
                <Arrow className="circle" />
              </CategoryButton>
            </Category>
          ))}
        </Categories>
      </CategoryContent>
    </Container>
  )
}

export default enhance(CourseCategories)
