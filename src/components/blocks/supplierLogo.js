import { React, Image, styled } from 'x'

const MaxWidthImage = styled(Image)`
  max-width: 320px;
  margin: 0px auto 60px;
`

const SupplierLogo = props => {
  return props.extra?.accreditorLogo?.file ? (
    <MaxWidthImage
      fixed={props.extra.accreditorLogo.file.sharp.fixed}
      style={{ display: 'block' }}
    />
  ) : null
}

export default SupplierLogo
