import { thingById } from './thingById';
import { ThingByIdResults } from './thingById.types';

import { thingByIdMock } from './thingById.mock';
import { GraphQLClient } from 'graphql-request';
import { GraphqlFetchingError } from '../../graphql/fetch';

jest.mock('graphql-request');

describe('thingById', () => {
  afterAll(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return token Data', async () => {
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<ThingByIdResults> => Promise.resolve(thingByIdMock),
    }));

    const result = await thingById('1');

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
    await expect(thingById('123')).rejects.toThrow(
      exploded,
    );
  });
});