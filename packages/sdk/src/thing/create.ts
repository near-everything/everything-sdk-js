import { gql, GraphQLClient } from 'graphql-request';
import { execute, mint, MintArgs } from "../../../../../mintbase-js/packages/sdk/src";
import { STORAGE_TYPE } from "../constants";
import { FinalExecutionOutcome } from '@near-wallet-selector/core';

export async function createThing(args: any) {
  // since we will be creating the thing across three possible storages,
  // generate the unique id now. Any better uuid methods for browser? https://medium.com/teads-engineering/generating-uuids-at-scale-on-the-web-2877f529d2a2
  const thingId = crypto.randomUUID();
  const resp = { cloudId: undefined, receiptId: undefined };

  // if (args.storage.includes(STORAGE_TYPE.OFFLINE)) {
  //   createOffline(thingId, args);
  // }

  // store thing data on cloud
  if (args.storage.includes(STORAGE_TYPE.CLOUD)) {
    const result = await createOnCloud(thingId, args);
    // resp.cloudId = result.createThing.thing.id;
  }

  // create a reference on blockchain
  if (args.storage.includes(STORAGE_TYPE.BLOCKCHAIN)) {
    const result = await createOnNEAR(thingId, args);
    // resp.receiptId = (result as FinalExecutionOutcome).receipts_outcome
  }
  return thingId;
}

// function createOffline(thingId: string, args: any) {
//   console.log("storing offline");
// }

function createOnCloud(thingId: string, args: any) {
  console.log("storing on cloud");
  try {
    // Validate args, should have user
    const endpoint = '/api/graphql'; // TEMP, need to fix CORS

    const graphQLClient = new GraphQLClient(endpoint) // TODO: add headers

    const mutation = gql`
      mutation createThing($input: CreateThingInput!) {
        createThing(input: $input) {
          thing {
            id
          }
        }
      }
    `; // TODO: have this come from codegen

    const variables = {
      input: {
        thingId: thingId,
        ownerId: args.user?.sub,
        characteristics: args.characteristics
      }
    };

    return graphQLClient.request(mutation, variables); // could handle collision, will return new thingId to be used in next steps
  } catch (e) {
    console.log(e); // TODO: error handling
  }
}

function createOnNEAR(thingId: string, args: any) {
  console.log("storing on blockchain");
  try {
    // create a basic document on arweave to reference? Then the document can be updated like when adding images?
    const mintArgs: MintArgs = { nftContractId: "everything.mintspace2.testnet", metadata: { reference: "hello" } } // TODO: reference thing id
    return execute(
      mint(mintArgs), { wallet: args.wallet }
    );
  } catch (e) {
    console.log(e); // TODO: error handling
  }
}