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
        }
      }
    }
  }
`