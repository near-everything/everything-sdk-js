import { execute, mint, MintArgs } from "@mintbase-js/sdk";
import { AccountId } from "@mintbase-js/sdk/lib/v1";
import { FinalExecutionOutcome } from "@near-wallet-selector/core";
import { isUuid } from "uuidv4";
import { NOT_VALID_UUID } from "../constants";

export type CreateThingBlockchainArgs = {
  wallet: any, // TODO: Wallet type
  ownerId: AccountId,
  nftContractId: AccountId
}

export async function mintThing(thingId: string, args: CreateThingBlockchainArgs): Promise<void | FinalExecutionOutcome> {
  if (!isUuid(thingId)) {
    throw new Error(NOT_VALID_UUID);
  }

  // TODO: confirm not duplicate on chain, query indexer for this id (mesh)

  const mintArgs: MintArgs = {
    nftContractId: args.nftContractId,
    reference: thingId, // everything logo
    ownerId: args.ownerId,
  }

  // create reference on blockchain
  return execute(mint(mintArgs), { wallet: args.wallet });
}