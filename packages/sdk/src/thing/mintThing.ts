import { execute, mint, MintArgs } from "@mintbase-js/sdk";
import { AccountId } from "@mintbase-js/sdk/lib/v1";
import { uploadFileToArweave } from "@mintbase-js/storage";
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

  // TODO: confirm not duplicate on chain, query indexer for this id (mesh)

  const metadata = Buffer.from(JSON.stringify({
    extra: thingId
  }));
  const response = await uploadFileToArweave(metadata, thingId);
  const url = `https://arweave.net/${response.id}`;

  const mintArgs: MintArgs = {
    nftContractId: args.nftContractId,
    reference: url,
    ownerId: args.ownerId,
  }

  // create reference on blockchain
  return execute(mint(mintArgs), { wallet: args.wallet });
}