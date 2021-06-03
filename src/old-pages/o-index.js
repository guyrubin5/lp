import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

const Container = styled.div`
  margin: 3rem auto;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export default () => (
  <Container>
    <h1>Hello World</h1>
    <Link to="/page-2/">Go to page 2</Link>

    <h2>Course</h2>
    <Link to="/uk/accreditors/apmg/">/uk/accreditors/apmg/</Link>
    <Link to="/uk/accreditors/oracle-database-12c-ocp/">/uk/accreditors/oracle-database-12c-ocp/</Link>
    <Link to="/uk/accreditors/linux-professional-institute/">/uk/accreditors/linux-professional-institute/</Link>
    <Link to="/uk/accreditors/lpi-advanced-level/">/uk/accreditors/lpi-advanced-level/</Link>
    <Link to="/uk/accreditors/togaf/">/uk/accreditors/togaf/</Link>
    <Link to="/uk/accreditors/vmware/">/uk/accreditors/vmware/</Link>

    <h2>Accreditors</h2>
    <Link to="/uk/courses/coding-courses/">/uk/courses/coding-courses/</Link>
    <Link to="/uk/courses/cyber-security-courses/">/uk/courses/cyber-security-courses/</Link>
    <Link to="/uk/courses/digital-marketing-courses/">/uk/courses/digital-marketing-courses/</Link>
    <Link to="/uk/courses/project-management-courses/">/uk/courses/project-management-courses/</Link>
    <Link to="/uk/courses/it-courses/">/uk/courses/it-courses/</Link>
    <Link to="/uk/courses/project-management/">/uk/courses/project-management/</Link>
    <Link to="/uk/courses/it/">/uk/courses/it/</Link>

    <h2>Careers</h2>
    <Link to="/uk/career/">/uk/career/</Link>

    <h2>Offers</h2>
    <Link to="/uk/offers/cyber-security-offers/">/uk/offers/cyber-security-offers/</Link>

    <h2>Pages</h2>
    <Link to="/uk/about-us/">/uk/about-us/</Link>

    <h2>CourseCategories</h2>
    <Link to="/uk/courses/">/uk/courses/</Link>
  </Container>
)
