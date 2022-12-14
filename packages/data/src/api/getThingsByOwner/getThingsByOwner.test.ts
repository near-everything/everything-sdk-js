import { getThingsByOwner } from './getThingsByOwner';
import { ThingsByOwnerResults } from './getThingsByOwner.types';

import { thingsByOwnerMock } from './getThingsByOwner.mock';
import { GraphQLClient } from 'graphql-request';
import { GraphqlFetchingError } from '../../graphql/fetch';

jest.mock('graphql-request');

describe('getThingsByOwner', () => {
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

    const result = await getThingsByOwner('1');

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
    const result = await getThingsByOwner('123');
    expect(result?.error).toEqual(exploded);
  });
});