import { execute, mint, MintArgs } from "@mintbase-js/sdk";
import { AccountId } from "@mintbase-js/sdk/lib/v1";
import { FinalExecutionOutcome, Wallet } from "@near-wallet-selector/core";
import { isUuid } from "uuidv4";
import { NOT_VALID_UUID } from "../constants";

export type CreateThingBlockchainArgs = {
  wallet: Wallet,
  ownerId: AccountId,
  nftContractId: AccountId
}

/**
 * mints a reference on chain for the provided thing id
 * @param thingId 
 * @param args {@link CreateThingBlockchainArgs}
 * @returns a result for single transactions of {@link FinalExecutionOutcome}
 */
export async function mintThing(thingId: string, args: CreateThingBlockchainArgs): Promise<void | FinalExecutionOutcome> {
  if (!isUuid(thingId)) {
    throw new Error(NOT_VALID_UUID);
  }

  // NOTE: the below code works, but I don't know why I want my reference to be anything more than the thing id (yet)  

  // const metadata = JSON.stringify({
  //   extra: thingId
  // });
  // const file = new File([metadata], `${thingId}.json`, {
  //   type: "application/json"
  // });
  // const response = await uploadFile(file);
  // const url = `https://arweave.net/${response.id}`;

  const mintArgs: MintArgs = {
    nftContractId: args.nftContractId,
    reference: thingId,
    ownerId: args.ownerId,
  }

  // create reference on blockchain
  return execute(mint(mintArgs), { wallet: args.wallet });
}