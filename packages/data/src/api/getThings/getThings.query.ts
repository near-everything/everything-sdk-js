import { gql } from 'graphql-request';

export const thingsQuery = gql`
  query things {
    things {
      id
      characteristics {
        nodes {
          attributeId
          optionId
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
        media {
          mediaUrl
        }
      }
    }
  }
`