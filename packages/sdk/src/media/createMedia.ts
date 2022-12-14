import { uploadFileToArweave } from "@mintbase-js/storage";
import { MEDIA_UPLOAD_ENDPOINT } from "../constants";
import { fetchEverything } from "../utils";
import { createMediaMutation } from "./createMedia.mutation";

type CreateMediaCloudArgs = {
  user: any,
  thingId?: string
}

type CloudError = {
  message: string
}

export async function createMediaOnCloud(files: File[], args: CreateMediaCloudArgs): Promise<any> {

  const formData = new FormData();

  if (args.thingId) {
    // this is preparing for the future for if media is uploaded
    // but should not be attributed with any thing
    formData.append("thingId", args.thingId);
  }
  formData.append("userId", args.user.sub);
  for (let i = 0; i < files.length; i++) {
    formData.append("files", files[i]);
  }
  try {
    const response = await uploadFilesToCloud(formData);
    return response;
  } catch (error: unknown) {
    console.error(`Error creating media: ${(error as CloudError).message}`)
    throw error;
  }
}

export async function uploadFilesToCloud(
  formData: FormData
) {
  // TODO: This will require an access token
  const response = await fetch(MEDIA_UPLOAD_ENDPOINT, {
    method: "POST",
    body: formData
  })
  const data = await response.json();
  if (!response.ok) {
    if (response.status === 400) {
      throw new Error(`Upload to everything was unsuccessful: ${data.errorCode}, ${data.errorMessage}`);
    } else if (response.status === 500) {
      throw new Error(`Error occurred during upload: ${data.errorMessage}`);
    } else {
      throw new Error(`An error has occured: ${response.status}`);
    }
  }
  return data;
}

type CreateMediaBlockchainArgs = {
  thingId?: string
}

export async function createMediaOnBlockchain(files: File[], args: CreateMediaBlockchainArgs): Promise<string[]> {
  const urls: string[] = [];
  for (let i = 0; i < files.length; i++) {
    const response = await uploadFileToArweave(files[i], `${new Date().toISOString()}`); //  + '-' + files[i].originalname
    const url = `https://arweave.net/${response.id}`;
    urls.push(url);
    const variables = {
      input: {
        url,
        thingId: args.thingId
      }
    }
    const { error } = await fetchEverything({ query: createMediaMutation, variables });
    if (error) {
      console.error("Error creating media", error.message);
      throw new Error(`Error creating media ${error.message}`)
    }
  }
  return urls;
}
