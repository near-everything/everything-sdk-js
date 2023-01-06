import { isUuid, uuid } from "uuidv4";
import { NOT_VALID_UUID, STORAGE_TYPE, USER_NOT_PROVIDED } from "../constants";
import { fetchEverything } from "../utils";
import { createThing, createThingOnCloud } from "./createThing";
import { createThingMutation } from "./createThing.mutation";

jest.mock('../utils');
jest.mock('uuidv4');

const user = {
  email: "test@me.com",
  sub: "everything|12345"
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
      user,
      characteristics
    };
    (fetchEverything as jest.Mock).mockImplementation(() => {
      return {
        data: null,
        error: undefined
      }
    });
    const response = await createThing(thingArgs);
    expect(fetchEverything).toHaveBeenCalled();
    expect(response).toEqual({ thingId: "uuid" })
  });

  test("throw error if cloud and user not provided", async () => {
    await expect(async () => {
      const thingArgs = {
        storage: [STORAGE_TYPE.CLOUD],
        characteristics
      }
      await createThing(thingArgs)
    }).rejects.toThrow(USER_NOT_PROVIDED);
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

  test("throw error if fetchEverything fails", async () => {
    jest.spyOn(global.console, 'error').mockImplementation(() => null);
    (fetchEverything as jest.Mock).mockImplementation(() => {
      return {
        error: { message: "ohhh nooo" }
      }
    });
    const { error } = await createThingOnCloud("uuid", cloudArgs);
    expect(error).toEqual({ message: "ohhh nooo" });
  });
})