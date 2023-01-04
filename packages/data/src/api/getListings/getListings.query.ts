import { gql } from 'graphql-request';

export const listingsQuery = gql`
  query listings {
    listings {
      price
      metadata_id
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