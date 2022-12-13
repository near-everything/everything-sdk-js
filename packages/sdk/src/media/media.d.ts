interface CreateMediaResponse {
  data?: any | null;
  error: undefined | Error;
}

export type CreateMediaArgs = {
  thingId?: string,
  files: any[],
  storage: string[]
};