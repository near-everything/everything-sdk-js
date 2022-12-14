import { getThingById } from './getThingById';
import { ThingByIdResults } from './getThingById.types';

import { thingByIdMock } from './getThingById.mock';
import { GraphQLClient } from 'graphql-request';
import { GraphqlFetchingError } from '../../graphql/fetch';

jest.mock('graphql-request');

describe('getThingById', () => {
  afterAll(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return thing by id data', async () => {
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<ThingByIdResults> => Promise.resolve(thingByIdMock),
    }));

    const result = await getThingById('1');

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
      request: (): Promise<ThingByIdResults> => Promise.reject(exploded),
    }));
    const result = await getThingById('123')
    expect(result?.error).toEqual(exploded);
  });
});