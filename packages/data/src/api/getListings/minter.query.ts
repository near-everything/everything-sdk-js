import { gql } from 'graphql-request';

export const minterQuery = gql`
  query minter($minterId: String!) {
    minter(minterId: $minterId) {
      minter_id
  }
}
`