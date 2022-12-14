import { gql } from 'graphql-request';

export const attributeByIdQuery = gql`
  query attributeById($attributeId: Int!) {
    attribute(id: $attributeId) {
      name
      relationships {
        edges {
          node {
            option {
              id
              value
            }
          }
        }
      }
    }
  }
`