import { GraphQLClient, gql } from 'graphql-request';
import { fetchEverything } from './fetch';

jest.mock('graphql-request');

type FakeData = {
  foo: string;
}

const fakeQuery = gql`query data(){}`;

describe('graphql/fetch', () => {
  it('returns data prop of type T when things go well', async () => {
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<FakeData> => Promise.resolve({ foo: 'bar' }),
    }));
    const { data, error } = await fetchEverything<FakeData>({ query: fakeQuery });
    expect(data).toBeDefined();
    expect(error).not.toBeDefined();
    expect(data?.foo).toBe('bar');
  });

  it('returns error in error prop', async () => {
    const boom = 'boom!';
    (GraphQLClient as jest.Mock).mockImplementationOnce(() => ({
      request: (): Promise<FakeData> => Promise.reject(new Error(boom)),
    }));
    const { data, error } = await fetchEverything<FakeData>({ query: fakeQuery });
    expect(data).not.toBeDefined();
    expect(error).toBeDefined();
    expect(error?.message).toBe(boom);
  });
});