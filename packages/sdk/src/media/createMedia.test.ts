import { uploadFileToArweave } from "@mintbase-js/storage";
import { MEDIA_UPLOAD_ENDPOINT, STORAGE_TYPE } from "../constants";
import { createMediaOnBlockchain, createMediaOnCloud, uploadFilesToCloud } from "./createMedia";
import { fetchEverything } from "../utils";

jest.mock('../utils');
jest.mock("@mintbase-js/storage")

const user = {
  email: "test@me.com",
  sub: "everything|12345"
}

const wallet = {
  id: "test-wallet.testnet"
}

const thingId = "thing123";
global.File = jest.fn() as jest.Mock;
const FormDataMock: jest.Mock<FormData> = jest.fn().mockImplementation(() => {
  const formData = {
    append: jest.fn()
  };
  return formData;
});

global.FormData = FormDataMock;

const files = [
  new global.File([new ArrayBuffer(1)], 'file.jpg')
]

describe('createMediaOnCloud should', () => {
  const cloudArgs = {
    user,
    thingId: "123-abc"
  };

  beforeEach(() => {
    jest.spyOn(global.console, 'error').mockImplementation(() => null);
  })

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
        Promise.resolve({ ok: false, status: 400, json: () => Promise.resolve({ errorCode: 405, errorMessage: "oops" }) })
      ) as jest.Mock
    );
    await expect(async () => {
      await uploadFilesToCloud(FormDataMock())
    }).rejects.toThrow("Upload to everything was unsuccessful: 405, oops");
  });

  test("throw error if 500 status", async () => {
    jest.spyOn(global, "fetch").mockImplementation(
      jest.fn(() =>
        Promise.resolve({ ok: false, status: 500, json: () => Promise.resolve({ errorMessage: "oops" }) })
      ) as jest.Mock
    );
    await expect(async () => {
      await uploadFilesToCloud(FormDataMock())
    }).rejects.toThrow("Error occurred during upload: oops");
  });

  test("throw error if other status", async () => {
    jest.spyOn(global, "fetch").mockImplementation(
      jest.fn(() =>
        Promise.resolve({ ok: false, status: 450, json: () => Promise.resolve({ errorMessage: "oops" }) })
      ) as jest.Mock
    );
    await expect(async () => {
      await uploadFilesToCloud(FormDataMock())
    }).rejects.toThrow("An error has occured: 450");
  });
});

describe('createMediaOnBlockchain should', () => {
  const blockchainArgs = {
    thingId,
  };
  test("call uploadFileToArweave for each file", async () => {
    (fetchEverything as jest.Mock).mockImplementation(() => {
      return {
        data: { createMedia: { media: { id: "id" } } }
      }
    });
    (uploadFileToArweave as jest.Mock).mockImplementation(() => {
      return {
        id: "media123"
      }
    });
    const response = await createMediaOnBlockchain(files, blockchainArgs);
    expect(uploadFileToArweave).toHaveBeenCalled();
    expect(fetchEverything).toHaveBeenCalled();
    expect(response).toEqual({ urls: ["https://arweave.net/media123"] });
  });

  test("throw error if mutation fails", async () => {
    jest.spyOn(global.console, 'error').mockImplementation(() => null);
    (fetchEverything as jest.Mock).mockImplementation(() => {
      return {
        error: { message: "ohhh nooo" }
      }
    });
    await expect(async () => {
      await createMediaOnBlockchain(files, blockchainArgs)
    }).rejects.toThrow("ohhh nooo");
  });
});
