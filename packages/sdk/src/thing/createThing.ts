
import { isUuid, uuid } from 'uuidv4';
import { NOT_VALID_UUID, STORAGE_TYPE, USER_NOT_PROVIDED } from "../constants";
import { fetchEverything, GraphqlFetchingError } from "../utils";
import { createThingMutation } from "./createThing.mutation";

export type CreateThingCloudResults = {
  data: any | null,
  error: undefined | GraphqlFetchingError
}

export type CreateThingArgs = {
  storage: string[],
  user?: any,
  characteristics: Characteristic[],
};

export type CreateThingCloudArgs = {
  user: any,
  characteristics: Characteristic[]
};

export type CreateThingResponse = {
  thingId: string
}

/**
 * Create a Thing on the specified storage service
 * Storage options: cloud
 * @param args {@link CreateThingArgs}
 * @returns thingId
 */
export async function createThing(args: CreateThingArgs): Promise<CreateThingResponse> {
  const thingId = uuid();

  // create on cloud
  if (args.storage.includes(STORAGE_TYPE.CLOUD)) {
    // confirm user provided
    if (!args.user) {
      throw new Error(USER_NOT_PROVIDED);
    }

    const cloudArgs: CreateThingCloudArgs = {
      user: args.user,
      characteristics: args.characteristics
    }
    await createThingOnCloud(thingId, cloudArgs);
  }

  const response = { thingId }
  
  return response;
}


/**
 * Create a Thing on cloud storage (everything api)
 * @param thingId
 * @param args {@link CreateThingCloudArgs}
 */
export async function createThingOnCloud(thingId: string, args: CreateThingCloudArgs): Promise<CreateThingCloudResults> { // create type
  if (!isUuid(thingId)) {
    throw new Error(NOT_VALID_UUID);
  }

  // TODO: confirm that the thing does not exist
  // if it does, throw error

  const variables = {
    input: {
      thingId: thingId,
      ownerId: args.user.sub,
      characteristics: args.characteristics,
    },
  };
  // create request to api
  const { data, error } = await fetchEverything({ query: createThingMutation, variables });
  // not expecting any response that isn't an error (what if attribute_id is not valid?)
  if (error) {
    console.error("Error creating thing", error.message);
  }
  return { data, error };
}