import { AccountId, MintArgs } from "../../../../../mintbase-js/packages/sdk/src";

interface CreateThingResponse {
  data?: any | null;
  error: undefined | GraphqlFetchingError;
}

export type CreateThingArgs = {
  user: any, // this will come from Auth0, used to get access token
  wallet: any, // this will come from Mintbase selector, used for mint
  characteristics?: Characteristic[],
  files?: File[],
  storage: string[]
  mintArgs?: MintArgs
};