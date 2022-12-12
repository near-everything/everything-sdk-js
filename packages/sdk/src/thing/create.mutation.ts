import { gql } from 'graphql-request';

export const createThingMutation = gql`
  mutation createThing($input: CreateThingInput!) {
    createThing(input: $input) {
      thing {
        id
      }
    }
  }
`