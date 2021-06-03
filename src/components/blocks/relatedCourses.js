import { compose, pure } from 'recompose'
import { Content, H2, H4, BorderedButton } from 'components/common'
import { React, Image, Link, styled, mq } from 'x'

import Arrow from 'static/svg/arrow.svg'

const Container = styled.div`
  padding: 80px 0;
  background: #e9eaee;

  ${mq.below('xl')} {
    padding: 60px 0;
  }

  ${mq.below('sm')} {
    padding: 30px 0;
  }
`

const RelatedCourseContent = styled(Content)`
  overflow: hidden;
`

const Title = styled(H4)`
  margin-top: 20px;
  margin-bottom: 60px;
`

const CourseContainer = styled.div`
  width: calc(100% + 35px);
  display: flex;
  flex-wrap: wrap;
`

// background-size: cover;

const CourseHeader = styled.div`
  height: 200px;
  width: 100%;
  padding: 30px;
  box-sizing: border-box;

  position: relative;
`

const CourseHeaderTitle = styled(H4)`
  color: #fff;
  z-index: 2;
`

const CourseHeaderImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const CourseContent = styled.div`
  padding: 0 38px 104px 38px;
`

const CourseHeaderGradient = styled.div`
  background: radial-gradient(
    circle at center,
    rgba(0, 0, 0, 0.2) 50%,
    transparent 140%
  );
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const CourseTitle = styled(H2)`
  font-size: 35px;
  line-height: 40px;

  ${mq.below('sm')} {
    font-size: 28px;
  }
`

const CourseButton = styled(BorderedButton)`
  position: absolute;
  bottom: 38px;
  left: 38px;
  right: 38px;
`

const Course = styled(Link)`
  text-decoration: none;
  background: #fff;
  box-sizing: border-box;
  width: 364px;
  margin: 0 35px 35px 0;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.2) 0 4px 10px;
  transition: all 0.1s ease-out;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.2) 0 17px 15px;
    transform: scale(1.05) translateY(-15px);
  }
`

const enhance = compose(pure)

const RelatedCourses = (props) => {
  if (!props.data.courses) {
    return null
  }

  const titleElement =
    props.data.titleElement && props.data.titleElement !== 'default'
      ? props.data.titleElement
      : 'h4'

  return (
    <Container>
      <RelatedCourseContent>
        <Title as={titleElement} line={true}>
          {props.data.title}
        </Title>
        <CourseContainer>
          {props.data.courses &&
            props.data.courses.map((course, index) => (
              <Course key={index} to={props.globalData.formatLink(course.link)}>
                <CourseHeader>
                  <CourseHeaderTitle as="span" line={true}>
                    {props.globalData.stringCourse}
                  </CourseHeaderTitle>
                  <Image
                    fixed={course.acf.image.file.sharp.fixed}
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      bottom: 0,
                      left: 0,
                      height: 'auto',
                      width: '100%',
                    }}
                  />
                  <CourseHeaderGradient />
                </CourseHeader>
                <CourseContent>
                  <CourseTitle>{course.title}</CourseTitle>
                  <CourseButton as="div">
                    {props.globalData.stringReadMoreHere}
                    <Arrow className="arrow" />
                  </CourseButton>
                </CourseContent>
              </Course>
            ))}
        </CourseContainer>
      </RelatedCourseContent>
    </Container>
  )
}

export default enhance(RelatedCourses)
