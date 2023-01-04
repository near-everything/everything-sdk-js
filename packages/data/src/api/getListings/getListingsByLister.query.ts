import { gql } from 'graphql-request';

export const listingsByListerQuery = gql`
  query listingsByLister($listerId: String!) {
    listingsByLister(listerId: $listerId) {
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