import { gql } from 'graphql-request';

export const thingByIdQuery = gql`
  query thingById($thingId: Int!) {
    thing(id: $thingId) {
      id
      characteristics {
        edges {
          node {
            attributeId
            optionId
          }
        }
      }
      medias {
        edges {
          node {
            mediaUrl
          }
        }
      }
    }
  }
`