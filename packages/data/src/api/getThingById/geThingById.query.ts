import { gql } from 'graphql-request';

export const thingByIdQuery = gql`
  query thingById($thingId: String!) {
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
    }
  }
`