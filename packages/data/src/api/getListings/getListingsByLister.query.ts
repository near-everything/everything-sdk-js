import { gql } from 'graphql-request';

export const listingsByListerQuery = gql`
  query activeListingsByLister($listerId: String!) {
    activeListingsByLister(listerId: $listerId) {
      price
      metadata_id
      nft_contract_id
      token_id
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