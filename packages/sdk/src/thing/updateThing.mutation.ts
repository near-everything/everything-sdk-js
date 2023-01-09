import { gql } from 'graphql-request';

export const updateThingMutation = gql`
  mutation updateThing($input: UpdateThingInput!) {
    updateThing(input: $input) {
      thing {
        id
      }
    }
  }
`