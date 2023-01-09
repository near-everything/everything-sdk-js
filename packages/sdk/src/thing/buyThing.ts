
import { buy, execute } from '@mintbase-js/sdk';
import { Wallet } from '@near-wallet-selector/core';
import { USER_NOT_PROVIDED } from "../constants";
import { fetchEverything, GraphqlFetchingError } from "../utils";
import { updateThingMutation } from './updateThing.mutation';

export type BuyThingCloudResults = {
  data: any | null,
  error: undefined | GraphqlFetchingError
}

export type BuyThingArgs = {
  thingId: string,
  user?: any,
  price: string,
  contractId: string,
  tokenId: string,
  referrerId: string,
  wallet: Wallet,
};

/**
 * Buy a Thing from marketplace
 * @param args {@link BuyThingArgs}
 */
export async function buyThing(args: BuyThingArgs): Promise<void> {
  // confirm user provided
  if (!args.user) {
    throw new Error(USER_NOT_PROVIDED);
  }

  const variables = {
    input: {
      id: args.thingId,
      patch: {
        ownerId: args.user.sub,
      }
    },
  };
  // create request to api to set owner
  const { data, error } = await fetchEverything({ query: updateThingMutation, variables });
  if (error) {
    console.error("Error updating thing, cancelling buy", error.message);
    return;
  } else {
    // check if price is greater
    const buyArgs = {
      price: args.price,
      nftContractId: args.contractId,
      tokenId: args.tokenId,
      referrerId: args.referrerId,
      marketId: "market-v2-beta.mintspace2.testnet",
    };
    await execute({ wallet: args.wallet }, buy(buyArgs));
  }
}