import { gql, GraphQLClient } from "graphql-request";
import { execute, mint, MintArgs } from "../../../../../mintbase-js/packages/sdk/src";
import type { Wallet } from '@near-wallet-selector/core';
import { STORAGE_TYPE } from "../constants";
import { CreateThingArgs } from "./thing";
import * as crypto from "crypto";

interface CreateThingResponse {
  data?: any | null;
  error: undefined | GraphqlFetchingError;
}

export class GraphqlFetchingError extends Error {
  constructor(msg: string) {
    super();
    this.message = msg;
  }
}


export async function createThing(args: CreateThingArgs): Promise<CreateThingResponse> {
  // since we will be creating the thing across three possible storages,
  // generate the unique id now. Any better uuid methods for browser? https://medium.com/teads-engineering/generating-uuids-at-scale-on-the-web-2877f529d2a2
  const thingId = crypto.randomUUID();

  const response: CreateThingResponse = {
    data: undefined,
    error: undefined,
  };
  // TODO: option to store offline rather than cloud
  // if (args.storage.includes(STORAGE_TYPE.OFFLINE)) { }

  if (args.storage.includes(STORAGE_TYPE.CLOUD)) {
    // store thing data on cloud
    const { data, error } = await createOnCloud(thingId, args);

    if (error) {
      // error, load response and do not continue
      response.error = error;
      return response;
    } else {
      // load id into response data
      response.data = { thingId: data.createThing.thing.id };
    }
  }

  if (args.storage.includes(STORAGE_TYPE.BLOCKCHAIN)) {
    // create a reference on blockchain
    const result = await createOnBlockchain(thingId, args.wallet, args.mintArgs!); // TODO: is there any error result?
    // load receipt id into response data
    response.data = { ...response.data, receiptId: result?.receipts_outcome };
  }

  return response;
}

async function createOnCloud(thingId: string, args: CreateThingArgs): Promise<{ data: any | null, error: undefined | GraphqlFetchingError }> {
  console.log("storing on cloud");

  const mutation = gql`
    mutation createThing($input: CreateThingInput!) {
      createThing(input: $input) {
        thing {
          id
        }
      }
    }
  `;

  const variables = {
    input: {
      thingId: thingId,
      ownerId: args.user?.sub,
      characteristics: args.characteristics,
    },
  };
  // make request to everything api


  const { data, error } = await fetchEverything({ query: mutation, variables });
  if (error) {
    console.error("Error creating thing", error.message);
  }

  return { data, error };
}

function createOnBlockchain(thingId: string, wallet: Wallet, args: MintArgs) {
  console.log("storing on blockchain");
  try {
    // create a basic document on arweave to reference? Then the document can be updated like when adding images?
    // create a field that links to the thing id
    // allow use to enter in nftcontractId.
    const mintArgs = {
      nftContractId: args.nftContractId,
      reference: "", // TODO: just be url to everything logo
      ownerId: "everything.testnet" // this should be the account, how?
      // How can I attach the thingId?
    };
    return execute(mint(mintArgs), { wallet });
  } catch (e) {
    console.log(e); // TODO: error handling
  }
}

async function fetchEverything({ query, variables }: any) {
  try {
    const client = new GraphQLClient("/api/graphql");
    return { data: await client.request(query, variables) };
  } catch (error: any) {
    return {
      error: new GraphqlFetchingError(error.message),
    };
  }
}