import { gql } from 'graphql-request';

export const thingsQuery = gql`
  query things {
    things {
      edges {
        node {
          id
          characteristics {
            edges {
              node {
                attributeId
                optionId
              }
            }
          }
          nft {
            nft_contract_id
            token_id
            listings {
              price
            }
          }
          tags {
            edges {
              node {
                media {
                  mediaUrl
                }
              }
            }
          }
        }
      }
    }
  }
`