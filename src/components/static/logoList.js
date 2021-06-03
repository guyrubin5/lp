import { Filters, React, styled } from 'x'
import { Content } from 'components/common'

import referencesQuery from 'components/static/referencesQuery'
import LogoGrid from 'components/blocks/logoGrid'

const Container = styled.div`
  padding: 100px 0;
  background-color: #f6f6f6;
`

const LogoList = props => {
  const combined = props.data.partners.concat(props.data.accreditors)

  return (
    <Container>
      <Content>
        <LogoGrid logos={combined} globalData={props.globalData} />
      </Content>
    </Container>
  )
}

export default referencesQuery(LogoList)
