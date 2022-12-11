import { gql } from 'graphql-request';

export const attributesQuery = gql`
  query getAttributes {
    attributes {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`