import { STORAGE_TYPE } from "../constants";
import { createThing } from "./create";
import { GraphQLClient, gql } from 'graphql-request';
import { execute, mint } from "../../../../../mintbase-js/packages/sdk/src";
import * as crypto from 'crypto'

// Object.defineProperty(global, 'crypto', {
//   value: {
//     randomUUID: () => crypto.randomUUID()
//   }
// });
jest.mock('graphql-request', () => {
  return {
    gql: jest.requireActual('graphql-request').gql,
    GraphQLClient: jest.fn()
  }
});
jest.mock('crypto');
jest.mock('../../../../../mintbase-js/packages/sdk/src');

const user = {
  email: "test@me.com",
  sub: "everything|12345"
}

const wallet = {
  id: "test-wallet.testnet"
}

const characteristics = [
  {
    attributeId: 1,
    optionId: 1
  }
]

describe('create thing on cloud', () => {
  const thingArgs = {
    user,
    wallet,
    storage: [STORAGE_TYPE.CLOUD],
    characteristics
  };
  test("createThing should call the everything api with correct arguments", async () => {
    const mockRandomUUID = jest.spyOn(crypto, 'randomUUID');
    mockRandomUUID.mockImplementation(() => 'mock-uuid');
    const mockRequest = jest.fn();
    (GraphQLClient as jest.Mock).mockImplementation(() => {
      return {
        request: mockRequest
      }
    });
    // (request as jest.Mock).mockImplementationOnce(() => (
    //   () => Promise.resolve({ foo: 'bar' })
    // ))
    const data = await createThing(thingArgs);
    expect(mockRandomUUID).toHaveBeenCalled();
    expect(mockRequest).toHaveBeenCalledWith(gql`
      mutation createThing($input: CreateThingInput!) {
        createThing(input: $input) {
          thing {
            id
          }
        }
      }
    `,
      { input: { ownerId: user.sub, characteristics } });
  });
});


describe('create thing on near', () => {
  const thingArgs = {
    user,
    wallet,
    storage: [STORAGE_TYPE.BLOCKCHAIN],
    characteristics
  };
  test("createThing should call execute with correct arguments", async () => {
    (mint as jest.Mock).mockImplementationOnce(() => (
      "mock mint"
    ))
    const data = await createThing(thingArgs);
    expect(mint).toHaveBeenCalledWith({ nftContractId: "everything.mintspace2.testnet", metadata: { reference: "hello" } });
    expect(execute).toHaveBeenCalledWith("mock mint", { wallet });
  });
});

