import { execute } from "@mintbase-js/sdk";
import { mint } from "@mintbase-js/sdk/lib/v1";
import { isUuid } from "uuidv4";
import { NOT_VALID_UUID } from "../constants";
import { mintThing } from "./mintThing";

jest.mock('@mintbase-js/sdk');
jest.mock('@mintbase-js/sdk/lib/v1');
jest.mock('uuidv4');

const wallet = {
  id: "test-wallet.testnet"
}

describe("mintThing should", () => {
  afterEach(() => jest.resetAllMocks());

  beforeEach(() => {
    (isUuid as jest.Mock).mockImplementation(() => true);
  });

  const thingArgs = {
    wallet: wallet,
    ownerId: "alice.testnet",
    nftContractId: "everything.test"
  }

  test("throw error if uuid is not valid", async () => {
    (isUuid as jest.Mock).mockImplementation(() => false);
    await expect(async () => {
      await mintThing("uuid", thingArgs)
    }).rejects.toThrow(NOT_VALID_UUID);
  });

  test("throw error if thing exists on chain", () => {
    // TODO
  });

  test("call execute and mint with the correct arguments", async () => {
    (mint as jest.Mock).mockImplementationOnce(() => (
      "mock mint"
    ));
    const respone = await mintThing("uuid", thingArgs);
    expect(mint).toHaveBeenCalled();
    expect(mint).toHaveBeenCalledWith({ network: "testnet", nftContractId: thingArgs.nftContractId, metadata: { reference: "" }, options: { ownerId: thingArgs.ownerId, metadataId: "uuid" } });
    expect(execute).toHaveBeenCalledWith("mock mint", { wallet });
  });
})