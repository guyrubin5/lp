import { React, styled } from 'x'
import { useEffect } from 'react'
import { createGlobalStyle } from 'styled-components'

const Block = styled.div`
  margin: 100px 0;
`

const Hidden = styled.div`
  display: none;
`

const Centered = styled.div`
  display: flex;
  justify-content: center;
`

const KnomaButton = props => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      let links = document.getElementsByTagName('link')
      let linkHref = 'https://api.knoma.io/paywith/paywith.css'
      let hasCSS = Array.from(links).reduce(
        (acc, link) => acc || link.href === linkHref,
        false
      )

      if (!hasCSS) {
        let linkEl = document.createElement('link')
        linkEl.href = linkHref
        linkEl.rel = 'stylesheet'
        linkEl.type = 'text/css'
        document.head.appendChild(linkEl)
      }
      if (typeof window.dom_loaded === 'undefined') {
        const script = document.createElement('script')
        script.src = 'https://api.knoma.io/paywith/launcher-min.js'
        document.body.appendChild(script)
      } else if (typeof window.dom_updated !== 'undefined') {
        window.dom_updated()
      }
    }
  }, [])

  let course = props.data.options
  if (typeof window !== 'undefined' && window.location.search.length) {
    let url = window.location.search.match(/course=([^&]+)/)
    if (url.length === 2) {
      course = props.data.options?.filter(option => option.url === url[1])
    }
  }

  if (course.length) {
    course = course[0]
  } else {
    course = null
  }

  return (
    <Block>
      <Hidden>
        <div id="k-c-id">{course?.courseID}</div>
        <div id="k-c-name">{course?.courseName}</div>
        <div id="k-c-price">{course?.totalCost}</div>
        {course?.courseStartDate && (
          <div id="k-c-startdate">{course?.courseStartDate}</div>
        )}
        {course?.lengthOfCourseDays && (
          <div id="k-c-days">{course?.lengthOfCourseDays}</div>
        )}
        {course?.lengthOfCourseWeeks && (
          <div id="k-c-weeks">{course?.lengthOfCourseWeeks}</div>
        )}
        {course?.campusLocation && (
          <div id="k-c-campus">{course?.campusLocation}</div>
        )}
        {course?.timeCommitment && (
          <div id="k-c-commitment">{course?.timeCommitment}</div>
        )}
        {course?.courseDescription && (
          <div id="k-c-summary">{course?.courseDescription}</div>
        )}
      </Hidden>
      <Centered>
        <div
          id="k-paywith-action"
          k-provider-id="0014J00000BV85DQAT"
          k-course-id={course?.courseID}
        ></div>
      </Centered>
    </Block>
  )
}

export default KnomaButton
