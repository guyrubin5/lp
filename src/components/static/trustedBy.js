import { React, styled, Filters, mq } from 'x'
import { Content, H4 } from 'components/common'

import LogoGrid from 'components/blocks/logoGrid'
import referencesQuery from 'components/static/referencesQuery'

const Container = styled.div`
  padding: 60px 0 30px;
  background-color: #fff;
  ${mq.below('lg')} {
    padding: 50px 0 25px;
  }
  ${mq.below('md')} {
    padding: 40px 0 20px;
  }
  ${mq.below('sm')} {
    padding: 30px 0 20px;
  }
`

const TrustedByContent = styled(Content)`
  ${mq.below('lg')} {
    padding: 0;
  }
`

const Title = styled(H4)`
  margin-bottom: 35px;
  ${mq.below('lg')} {
    margin-left: 5%;
  }
`

const TrustedBy = props => {
  return (
    <Container>
      <TrustedByContent>
        <Title line={true}>{props.globalData.stringTrustedBy}</Title>
        <LogoGrid
          small={true}
          scrollable={true}
          globalData={props.globalData}
          logos={props.data.clients}
        />
      </TrustedByContent>
    </Container>
  )
}

export default referencesQuery(TrustedBy)
