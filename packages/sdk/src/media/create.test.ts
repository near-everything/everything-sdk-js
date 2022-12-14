import { MEDIA_UPLOAD_ENDPOINT, STORAGE_TYPE } from "../constants";
import { createMediaOnCloud } from "./create";

const user = {
  email: "test@me.com",
  sub: "everything|12345"
}

const wallet = {
  id: "test-wallet.testnet"
}

const thingId = "thing123";
global.File = jest.fn() as jest.Mock;
global.FormData = jest.fn(() => ({
  append: jest.fn()
})) as jest.Mock;

const files = [
  new global.File([new ArrayBuffer(1)], 'file.jpg')
]

describe('createMediaOnCloud should', () => {
  const cloudArgs = {
    user,
    thingId: "123-abc"
  };

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("call the everything api with correct arguments and return urls", async () => {
    const fetchMock = jest.spyOn(global, "fetch").mockImplementation(
      jest.fn(() =>
        Promise.resolve({ ok: true, json: () => Promise.resolve({ data: { urls: "https://example.com/file" } }) })
      ) as jest.Mock
    );
    const response = await createMediaOnCloud(files, cloudArgs);
    expect(fetchMock).toHaveBeenCalled();
    expect(fetchMock).toHaveBeenCalledWith(
      MEDIA_UPLOAD_ENDPOINT,
      expect.any(Object)
    )
  });

  test("throw error if 400 status", async () => {
    const fetchMock = jest.spyOn(global, "fetch").mockImplementation(
      jest.fn(() =>
        Promise.resolve({ ok: false, status: 400, json: () => Promise.resolve({ data: { errorCode: 405, errorMessage: "oops" } }) })
      ) as jest.Mock
    );
    await expect(async () => {
      await createMediaOnCloud(files, cloudArgs)
    }).rejects.toThrow("Upload to everything was unsuccessful: 405, oops");
  });

  test("throw error if 500 status", async () => {
    // jest.spyOn(global, "fetch").mockResolvedValueOnce(
    //   jest.fn(() =>
    //     Promise.resolve({ ok: false, status: 500, json: () => Promise.resolve({ data: { errorMessage: "oops" } }) })
    //   ) as jest.Mock
    // );
    // await expect(async () => {
    //   await createMediaOnCloud(files, cloudArgs)
    // }).rejects.toThrow("Error occurred during upload: oops");
  });

  test("throw error if other status", async () => {
    // jest.spyOn(global, "fetch").mockResolvedValueOnce(
    //   jest.fn(() =>
    //     Promise.resolve({ ok: false, status: 450, json: () => Promise.resolve({ data: { errorMessage: "oops" } }) })
    //   ) as jest.Mock
    // );
    // await expect(async () => {
    //   await createMediaOnCloud(files, cloudArgs)
    // }).rejects.toThrow("An error has occured: 450");
  });
});

describe('createMediaOnBlockchain should', () => {
  const thingArgs = {
    user,
    wallet,
    storage: [STORAGE_TYPE.BLOCKCHAIN],
    // files
  };
  test("call uploadFileToArweave for each file", async () => {
    // assert arweave called
  });
});
