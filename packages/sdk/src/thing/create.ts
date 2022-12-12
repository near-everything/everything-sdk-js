import { gql, GraphQLClient } from "graphql-request";
import { execute, mint, MintArgs } from "../../../../../mintbase-js/packages/sdk/src";
import type { Wallet } from '@near-wallet-selector/core';
import { STORAGE_TYPE } from "../constants";
import { CreateThingArgs, CreateThingResponse } from "./thing";
import * as crypto from "crypto";
import { fetchEverything, GraphqlFetchingError } from "../utils";
import { createThingMutation } from "./create.mutation";

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

  const variables = {
    input: {
      thingId: thingId,
      ownerId: args.user?.sub,
      characteristics: args.characteristics,
    },
  };
  
  // make request to everything api
  const { data, error } = await fetchEverything({ query: createThingMutation, variables });
  if (error) {
    console.error("Error creating thing", error.message);
  }

  return { data, error };
}

function createOnBlockchain(thingId: string, wallet: Wallet, args: MintArgs) {
  try {
    // create a basic document on arweave to reference? Then the document can be updated like when adding images?
    // create a field that links to the thing id
    // allow use to enter in nftcontractId.
    const mintArgs = {
      nftContractId: args.nftContractId,
      reference: args.reference, // TODO: just be url to everything logo
      ownerId: args.ownerId // this should be the account, how?
      // How can I attach the thingId?
    };
    return execute(mint(mintArgs), { wallet });
  } catch (error) {
    console.error("Error minting thing", error); // TODO: error handling
  }
}