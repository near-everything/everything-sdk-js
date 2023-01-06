import { gql } from 'graphql-request';

export const listingsQuery = gql`
  query listings {
    listings {
      price
      metadata_id
      nft_contract_id
      token_id
      listed_by
      thing {
        id
        tags {
          media {
            mediaUrl
          }
        }
      }
    }
  }
`