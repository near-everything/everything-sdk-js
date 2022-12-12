interface CreateMediaResponse {
  data?: any | null;
  error: undefined | Error;
}

export type CreateMediaArgs = {
  files: any[],
  storage: string[]
};