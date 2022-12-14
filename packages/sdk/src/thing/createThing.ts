
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
  user: any, // this will come from Auth0, used to get access token
  characteristics: Characteristic[]
};

export async function createThing(args: CreateThingArgs): Promise<string> {
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
  
  return thingId;
}

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
    throw Error(error.message);
  }
  return { data, error };
}