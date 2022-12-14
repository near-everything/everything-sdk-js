import { execute, mint } from "@mintbase-js/sdk";
import { isUuid } from "uuidv4";
import { NOT_VALID_UUID } from "../constants";
import { mintThing } from "./mintThing";

jest.mock('@mintbase-js/sdk');
jest.mock('uuidv4');

const mockNearSelectorWallet = {
  signAndSendTransaction: jest.fn(),
  signAndSendTransactions: jest.fn(),
};

describe("mintThing should", () => {
  afterEach(() => jest.resetAllMocks());

  beforeEach(() => {
    (isUuid as jest.Mock).mockImplementation(() => true);
  });

  const thingArgs = {
    wallet: mockNearSelectorWallet as any,
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
    await mintThing("uuid", thingArgs);
    expect(mint).toHaveBeenCalled();
    expect(mint).toHaveBeenCalledWith({ nftContractId: thingArgs.nftContractId, reference: "uuid", ownerId: thingArgs.ownerId });
    expect(execute).toHaveBeenCalledWith("mock mint", { wallet: mockNearSelectorWallet });
  });
})