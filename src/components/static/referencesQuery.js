import { StaticQuery, graphql } from 'gatsby'
import { React, Filters } from 'x'

export default Component => props => (
  <StaticQuery
    query={graphql`
      query {
        allAccreditors: allWordpressInnoThings(
          filter: {
            layout: { eq: "accreditors" }
            acf: { accreditor_featured: { eq: true } }
          }
        ) {
          accreditors: edges {
            node {
              id: wordpress_id
              title
              link
              language {
                code
              }
              acf {
                title: accreditor_title
                subtitle: accreditor_subtitle
                thumbnail: accreditor_thumbnail {
                  file: localFile {
                    sharp: childImageSharp {
                      fixed(width: 185, quality: 80) {
                        width
                        height
                        src
                        srcSet
                        srcWebp
                        srcSetWebp
                      }
                    }
                  }
                }
              }
            }
          }
        }
        allClients: allWordpressInnoThings(
          filter: {
            layout: { eq: "clients" }
            acf: { client_featured: { eq: true } }
          }
        ) {
          clients: edges {
            node {
              title
              language {
                code
              }
              acf {
                thumbnail: client_image {
                  file: localFile {
                    sharp: childImageSharp {
                      fixed(width: 185, quality: 80) {
                        width
                        height
                        src
                        srcSet
                        srcWebp
                        srcSetWebp
                      }
                    }
                  }
                }
              }
            }
          }
        }
        allPartners: allWordpressInnoThings(
          filter: {
            layout: { eq: "partners" }
            acf: { partner_featured: { eq: true } }
          }
        ) {
          partners: edges {
            node {
              title
              language {
                code
              }
              acf {
                subtitle: partner_subtitle
                url: partner_url
                thumbnail: partner_thumbnail {
                  file: localFile {
                    sharp: childImageSharp {
                      fixed(width: 185, quality: 80) {
                        width
                        height
                        src
                        srcSet
                        srcWebp
                        srcSetWebp
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={data => {
      let {
        allAccreditors: { accreditors },
        allClients: { clients },
        allPartners: { partners }
      } = data

      let node = ({ node }) => node
      let lang = props.post.language.code

      partners = Filters.byLanguage(partners, lang).map(node)
      clients = Filters.byLanguage(clients, lang).map(node)
      accreditors = Filters.byLanguage(accreditors, lang).map(node)

      const formattedData = {
        partners,
        clients,
        accreditors
      }

      return <Component {...props} data={formattedData} />
    }}
  />
)
