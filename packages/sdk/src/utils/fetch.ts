import { DocumentNode } from 'graphql';
import { GraphQLClient, Variables } from 'graphql-request';
import { GRAPHQL_ENDPOINT } from '../constants';

export class GraphqlFetchingError extends Error {
  constructor(msg: string) {
    super();
    this.message = msg;
  }
}

export type GqlFetchResult<T> = {
  data?: T;
  error?: GraphqlFetchingError;
}

export const fetchEverything = async <T, V = Record<string, unknown>>({
  query,
  variables,
}: {
  query: DocumentNode | string;
  variables?: Variables;
}) => {
  try {
    const client = new GraphQLClient(GRAPHQL_ENDPOINT);
    return { data: await client.request<T>(query, variables) };
  } catch (error: any) {
    return {
      error: new GraphqlFetchingError(error.message),
    };
  }
};