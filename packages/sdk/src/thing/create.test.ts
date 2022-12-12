import { gql } from "graphql-request";
import { STORAGE_TYPE } from "../constants";
import { createThing } from "./create";
import { fetchEverything } from "../utils";
import { execute, mint } from "../../../../../mintbase-js/packages/sdk/src";
import * as crypto from 'crypto'
import { createThingMutation } from "./create.mutation";

jest.mock('../utils');
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

  let mockRandomUUID: jest.SpyInstance;

  afterEach(() => jest.resetAllMocks());

  beforeEach(() => {
    mockRandomUUID = jest.spyOn(crypto, 'randomUUID');
    mockRandomUUID.mockImplementation(() => '123-daf');
  });

  beforeAll(() => {
    jest.spyOn(global.console, 'error').mockImplementation(() => null);
  });

  const thingArgs = {
    user,
    wallet,
    storage: [STORAGE_TYPE.CLOUD],
    characteristics
  };

  test("createThing should call the everything api with correct arguments", async () => {
    (fetchEverything as jest.Mock).mockImplementation(() => {
      return {
        data: { createThing: { thing: { id: "123-daf" } } }
      }
    });
    const data = await createThing(thingArgs);
    expect(mockRandomUUID).toHaveBeenCalled();
    expect(fetchEverything).toHaveBeenCalledWith({
      query: createThingMutation,
      variables: { input: { thingId: "123-daf", ownerId: user.sub, characteristics } }
    });
    expect(data).toEqual({ data: { thingId: "123-daf" }, error: undefined })
  });

  test("createThing should return error if cloud returns error", async () => {
    (fetchEverything as jest.Mock).mockImplementation(() => {
      return {
        error: { message: "ohhh nooo" }
      }
    });
    const data = await createThing(thingArgs);
    expect(mockRandomUUID).toHaveBeenCalled();
    expect(fetchEverything).toHaveBeenCalledWith({
      query: createThingMutation,
      variables: { input: { thingId: "123-daf", ownerId: user.sub, characteristics } }
    });
    expect(data).toEqual({ data: undefined, error: { message: "ohhh nooo" } })
  });
});


describe('create thing on near', () => {

  let mockRandomUUID: jest.SpyInstance;

  afterEach(() => jest.resetAllMocks());

  beforeAll(() => {
    mockRandomUUID = jest.spyOn(crypto, 'randomUUID');
    mockRandomUUID.mockImplementation(() => '123-daf');
  });

  const thingArgs = {
    user,
    wallet,
    storage: [STORAGE_TYPE.BLOCKCHAIN],
    characteristics,
    mintArgs: { nftContractId: "sample.testnet", reference: "https://everything.dev", ownerId: "everything.testnet" }
  };

  test("createThing should call execute with correct arguments", async () => {
    (mint as jest.Mock).mockImplementationOnce(() => (
      "mock mint"
    ));
    (execute as jest.Mock).mockImplementationOnce(() => (
      { receipts_outcome: "receipt123" }
    ));
    const data = await createThing(thingArgs);
    expect(mockRandomUUID).toHaveBeenCalled();
    expect(mint).toHaveBeenCalledWith({ nftContractId: "sample.testnet", reference: "https://everything.dev", ownerId: "everything.testnet" });
    expect(execute).toHaveBeenCalledWith("mock mint", { wallet });
    expect(data).toEqual({ data: { receiptId: "receipt123" }, error: undefined })
  });
});
