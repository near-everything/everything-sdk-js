import { getAttributes } from './attributes';
import { AttributesResults } from './attributes.types';

import { GraphQLClient } from 'graphql-request';
import { GraphqlFetchingError } from '../../graphql/fetch';
import { attributesMock } from './attributes.mock';

jest.mock('graphql-request');

describe('attributes', () => {
  afterAll(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return attributes data', async () => {
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<AttributesResults> => Promise.resolve(attributesMock),
    }));

    const result = await getAttributes();

    expect(result?.data?.attributes.edges[0].node.id).toBe(
      1
    );
  });

  it('should handle errors', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {
      console.log('Suppressed console error.');
    });

    const errMessage = 'exploded';
    const exploded = new GraphqlFetchingError(errMessage);
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<AttributesResults> => Promise.reject(exploded),
    }));
    const result = await getAttributes();
    expect(result?.error).toEqual(exploded);
  });
});