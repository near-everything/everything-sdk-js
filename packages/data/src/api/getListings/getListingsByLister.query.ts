import { gql } from 'graphql-request';

export const listingsByListerQuery = gql`
  query activeListingsByLister($listerId: String!) {
    activeListingsByLister(listerId: $listerId) {
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