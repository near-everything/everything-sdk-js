import { gql } from 'graphql-request';

export const thingsQuery = gql`
  query things {
    things {
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