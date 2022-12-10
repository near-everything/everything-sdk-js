import { STORAGE_TYPE } from "../constants";
import { createMedia } from "./create";

const user = {
  email: "test@me.com",
  sub: "everything|12345"
}

const wallet = {
  id: "test-wallet.testnet"
}

const thingId = "thing123";

const files = [
  File
]

describe('create media on cloud', () => {
  const mediaArgs = {
    user,
    wallet,
    storage: [STORAGE_TYPE.CLOUD],
    files
  };
  test("createMedia should call the everything api with correct arguments", async () => {
    // (request as jest.Mock).mockImplementationOnce(() => (
    //   () => Promise.resolve({ foo: 'bar' })
    // ))
    const data = await createMedia(thingId, mediaArgs);
    // validate form data is correct
    // assert fetch has been called with proper arguments
  });


  describe('create media on blockchain', () => {
    const thingArgs = {
      user,
      wallet,
      storage: [STORAGE_TYPE.BLOCKCHAIN],
      files
    };
    test("createMedia should call ??? with correct arguments", async () => {
      // assert arweave called
    });
  });
});
