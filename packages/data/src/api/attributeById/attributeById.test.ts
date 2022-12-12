import { attributeById } from './attributeById';
import { AttributeByIdResults } from './attributeById.types';

import { attributeByIdMock } from './attributeById.mock';
import { GraphQLClient } from 'graphql-request';
import { GraphqlFetchingError } from '../../graphql/fetch';

jest.mock('graphql-request');

describe('attributeById', () => {
  afterAll(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return attribute by id data', async () => {
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<AttributeByIdResults> => Promise.resolve(attributeByIdMock),
    }));

    const result = await attributeById(1);

    expect(result?.data?.attribute.id).toBe(
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
      request: (): Promise<AttributeByIdResults> => Promise.reject(exploded),
    }));
    await expect(attributeById(123)).rejects.toThrow(
      exploded,
    );
  });
});