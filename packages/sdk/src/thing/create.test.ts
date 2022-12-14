import { execute } from "@mintbase-js/sdk";
import { mint } from "@mintbase-js/sdk/lib/v1";
import { MINT_ARGS_NOT_PROVIDED, NOT_VALID_UUID, STORAGE_TYPE, USER_NOT_PROVIDED, WALLET_NOT_PROVIDED } from "../constants";
import { fetchEverything } from "../utils";
import { createThing, createThingOnBlockchain, createThingOnCloud } from "./create";
import { createThingMutation } from "./create.mutation";
import { isUuid, uuid } from "uuidv4";

jest.mock('../utils');
jest.mock('@mintbase-js/sdk');
jest.mock('@mintbase-js/sdk/lib/v1');
jest.mock('uuidv4');

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

describe("createThing should", () => {

  afterEach(() => jest.resetAllMocks());

  beforeEach(() => {
    (uuid as jest.Mock).mockImplementation(() => 'uuid');
    (isUuid as jest.Mock).mockImplementation(() => true);
  });

  test("call createThingOnCloud when storage includes CLOUD", async () => {
    const thingArgs = {
      storage: [STORAGE_TYPE.CLOUD],
      user
    };
    (fetchEverything as jest.Mock).mockImplementation(() => {
      return {
        data: null,
        error: undefined
      }
    });
    const response = await createThing(thingArgs);
    expect(fetchEverything).toHaveBeenCalled();
  });

  test("call createThingOnBlockchain when storage includes BLOCKCHAIN", async () => {
    const thingArgs = {
      storage: [STORAGE_TYPE.BLOCKCHAIN],
      wallet: wallet,
      ownerId: "alice.testnet",
      nftContractId: "everything.test"
    }
    const response = await createThing(thingArgs);
    expect(mint).toHaveBeenCalled();
  });

  test("throw error if cloud and user not provided", async () => {
    await expect(async () => {
      const thingArgs = {
        storage: [STORAGE_TYPE.CLOUD]
      }
      await createThing(thingArgs)
    }).rejects.toThrow(USER_NOT_PROVIDED);
  });

  test("throw error if blockchain and ownerId or nftContractId not provided", async () => {
    await expect(async () => {
      const thingArgs = {
        storage: [STORAGE_TYPE.BLOCKCHAIN],
        wallet: wallet,
        ownerId: "alice.testnet",
      }
      await createThing(thingArgs)
    }).rejects.toThrow(MINT_ARGS_NOT_PROVIDED);

    await expect(async () => {
      const thingArgs = {
        storage: [STORAGE_TYPE.BLOCKCHAIN],
        wallet: wallet,
        nftContractId: "everything.test"
      }
      await createThing(thingArgs)
    }).rejects.toThrow(MINT_ARGS_NOT_PROVIDED);
  });

  test("throw error if blockchain and wallet not provided", async () => {
    await expect(async () => {
      const thingArgs = {
        storage: [STORAGE_TYPE.BLOCKCHAIN],
        ownerId: "alice.testnet",
        nftContractId: "everything.test"
      }
      await createThing(thingArgs)
    }).rejects.toThrow(WALLET_NOT_PROVIDED);
  });
});

describe("createThingOnCloud should", () => {
  afterEach(() => jest.resetAllMocks());

  beforeEach(() => {
    (isUuid as jest.Mock).mockImplementation(() => true);
  });

  const cloudArgs = {
    user,
    characteristics
  }

  test("throw error if uuid is not valid", async () => {
    (isUuid as jest.Mock).mockImplementation(() => false);
    await expect(async () => {
      await createThingOnCloud("uuid", cloudArgs)
    }).rejects.toThrow(NOT_VALID_UUID);
  });

  test("call fetchEverything with the correct arguments", async () => {
    (fetchEverything as jest.Mock).mockImplementation(() => {
      return {
        data: { createThing: { thing: { id: "uuid" } } }
      }
    });
    const { data } = await createThingOnCloud("uuid", cloudArgs)
    expect(fetchEverything).toHaveBeenCalled();
    expect(fetchEverything).toHaveBeenCalledWith({
      query: createThingMutation,
      variables: { input: { thingId: "uuid", ownerId: user.sub, characteristics } }
    });
    expect(data).toEqual({ createThing: { thing: { id: "uuid" } } })
  });

  test("return error if fetchEverything fails", async () => {
    jest.spyOn(global.console, 'error').mockImplementation(() => null);
    (fetchEverything as jest.Mock).mockImplementation(() => {
      return {
        error: { message: "ohhh nooo" }
      }
    });
    const { error } = await createThingOnCloud("uuid", cloudArgs)
    expect(fetchEverything).toHaveBeenCalled();
    expect(error).toEqual({ message: "ohhh nooo" })
  });
})

describe("createThingOnBlockchain should", () => {
  afterEach(() => jest.resetAllMocks());

  beforeEach(() => {
    (isUuid as jest.Mock).mockImplementation(() => true);
  });

  const blockchainArgs = {
    wallet: wallet,
    ownerId: "alice.testnet",
    nftContractId: "everything.test"
  }

  test("throw error if uuid is not valid", async () => {
    (isUuid as jest.Mock).mockImplementation(() => false);
    await expect(async () => {
      await createThingOnBlockchain("uuid", blockchainArgs)
    }).rejects.toThrow(NOT_VALID_UUID);
  });

  test("call execute and mint with the correct arguments", async () => {
    (mint as jest.Mock).mockImplementationOnce(() => (
      "mock mint"
    ));
    const respone = await createThingOnBlockchain("uuid", blockchainArgs);
    expect(mint).toHaveBeenCalled();
    expect(mint).toHaveBeenCalledWith({ network: "testnet", nftContractId: blockchainArgs.nftContractId, metadata: { reference: "" }, options: { ownerId: blockchainArgs.ownerId, metadataId: "uuid" } });
    expect(execute).toHaveBeenCalledWith("mock mint", { wallet });
  });
})