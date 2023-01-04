import { gql } from 'graphql-request';

export const thingsByOwnerQuery = gql`
  query thingsByOwner($ownerId: String!) {
    things(condition: { ownerId: $ownerId }) {
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