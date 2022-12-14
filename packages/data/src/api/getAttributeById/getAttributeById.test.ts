import { attributeById } from './getAttributeById';
import { AttributeByIdResults } from './getAttributeById.types';

import { attributeByIdMock } from './getAttributeById.mock';
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
    const result = await attributeById(123);
    expect(result?.error).toEqual(exploded);
  });
});