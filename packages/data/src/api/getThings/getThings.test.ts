import { getThings } from './getThings';
import { ThingsResults } from './getThings.types';

import { GraphQLClient } from 'graphql-request';
import { GraphqlFetchingError } from '../../graphql/fetch';
import { thingsMock } from './getThings.mock';

jest.mock('graphql-request');

describe('getThings', () => {
  afterAll(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return all things', async () => {
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<ThingsResults> => Promise.resolve(thingsMock),
    }));

    const result = await getThings();

    expect(result?.data?.things.edges[0].node.id).toBe(
      1
    );
  });

  it('should handle errors', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {
      // console.log('Suppressed console error.');
    });

    const errMessage = 'exploded';
    const exploded = new GraphqlFetchingError(errMessage);
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<ThingsResults> => Promise.reject(exploded),
    }));
    const result = await getThings();
    expect(result?.error).toEqual(exploded);
  });
});