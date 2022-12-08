import * as crypto from 'crypto';
import { gql, GraphQLClient } from 'graphql-request';
import { execute, mint, MintArgs } from "../../../../../mintbase-js/packages/sdk/src";
import { STORAGE_TYPE } from "../constants";

export async function createThing(args: any) {
  // since we will be creating the thing across three possible storages,
  // generate the unique id now. Any better uuid methods for browser? https://medium.com/teads-engineering/generating-uuids-at-scale-on-the-web-2877f529d2a2
  const thingId = crypto.randomUUID();

  if (args.storage.includes(STORAGE_TYPE.OFFLINE)) {
    createOffline(thingId, args);
  }

  if (args.storage.includes(STORAGE_TYPE.CLOUD)) {
    await createOnCloud(thingId, args);
  }

  if (args.storage.includes(STORAGE_TYPE.NEAR)) {
    await createOnNEAR(thingId, args);
  }
  return thingId;
}

function createOffline(thingId: string, args: any) {
  console.log("storing offline");
}

async function createOnCloud(thingId: string, args: any) {
  try {
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
        ownerId: args.user?.sub,
        characteristics: args.characteristics
      } // TODO: add thing id, need api work
    };

    return await graphQLClient.request(mutation, variables);
  } catch (e) {
    console.log(e); // TODO: error handling
  }
}

async function createOnNEAR(thingId: string, args: any) {
  try {
    const mintArgs: MintArgs = { nftContractId: "everything.mintspace2.testnet", metadata: { reference: "hello" } } // TODO: reference thing id
    return await execute(
      mint(mintArgs), { wallet: args.wallet }
    );
  } catch (e) {
    console.log(e); // TODO: error handling
  }
}


 // const formData = new FormData();
    // formData.append("characteristics", JSON.stringify(args.characteristics));
    // formData.append("creatorId", args.user?.sub);
    // for (let i = 0; i < args.files?.length; i++) {
    //   formData.append("files", args.files[i].data);
    // }