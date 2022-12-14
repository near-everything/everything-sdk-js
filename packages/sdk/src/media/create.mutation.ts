import { gql } from 'graphql-request';

export const createMediaMutation = gql`
  mutation createMedia($input: CreateMediaInput!) {
    createMedia(input: $input) {
      media {
        id
      }
    }
  }
`