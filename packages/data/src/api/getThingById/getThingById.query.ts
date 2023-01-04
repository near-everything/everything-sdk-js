import { gql } from 'graphql-request';

export const thingByIdQuery = gql`
  query thingById($thingId: String!) {
    thing(id: $thingId) {
      id
      characteristics {
        attributeId
        optionId
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