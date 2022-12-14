import { thingsByOwner } from './thingsByOwner';
import { ThingsByOwnerResults } from './thingsByOwner.types';

import { thingsByOwnerMock } from './thingsByOwner.mock';
import { GraphQLClient } from 'graphql-request';
import { GraphqlFetchingError } from '../../graphql/fetch';

jest.mock('graphql-request');

describe('thingsByOwner', () => {
  afterAll(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return things by owner data', async () => {
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<ThingsByOwnerResults> => Promise.resolve(thingsByOwnerMock),
    }));

    const result = await thingsByOwner('1');

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
      request: (): Promise<ThingsByOwnerResults> => Promise.reject(exploded),
    }));
    const result = await thingsByOwner('123');
    expect(result?.error).toEqual(exploded);
  });
});