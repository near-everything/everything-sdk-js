import { uploadFile } from "@mintbase-js/storage";
import { MEDIA_UPLOAD_ENDPOINT } from "../constants";
import { fetchEverything } from "../utils";
import { createMediaMutation } from "./createMedia.mutation";

type CreateMediaCloudArgs = {
  user: any,
  thingId: string
}

type CreateMediaResponse = {
  urls: string[]
}

type CloudError = {
  message: string
}

/**
 * Uploads array of files to cloud storage (everything api)
 * Constructs FormData for upload
 * @param files list of files to upload
 * @param args {@link CreateMediaCloudArgs}
 * @returns list of urls {@link CreateMediaResponse}
 */
export async function createMediaOnCloud(files: File[], args: CreateMediaCloudArgs): Promise<CreateMediaResponse> {

  // construct form data for multipart/form-data
  const formData = new FormData();
  formData.append("thingId", args.thingId);
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

/**
 * Sends request to everything api for file upload
 * @param formData prepared form data, contains thingId and files
 * @returns list of urls {@link CreateMediaResponse}
 */
export async function uploadFilesToCloud(
  formData: FormData
): Promise<CreateMediaResponse> {
  // TODO: This will require an access token
  const response = await fetch(MEDIA_UPLOAD_ENDPOINT, {
    method: "POST",
    body: formData
  })
  const data = await response.json();
  if (!response.ok) {
    if (response.status === 400) {
      // Successful upload to object storage, but failure creating references in database
      throw new Error(`Upload to everything was unsuccessful: ${data.errorCode}, ${data.errorMessage}`);
    } else if (response.status === 500) {
      // Unsuccessful upload to object storage
      throw new Error(`Error occurred during upload: ${data.errorMessage}`);
    } else {
      throw new Error(`An error has occured: ${response.status}`);
    }
  }
  return data;
}

type CreateMediaBlockchainArgs = {
  thingId: string
}

/**
 * Uploads array of files to blockchain storage (Arweave)
 * @param files list of files to upload
 * @param args {@link CreateMediaBlockchainArgs}
 * @returns list of urls {@link CreateMediaResponse}
 */
export async function createMediaOnBlockchain(files: File[], args: CreateMediaBlockchainArgs): Promise<CreateMediaResponse> {
  const urls: string[] = [];
  
  // upload each file individually to arweave via Mintbase SDK
  for (let i = 0; i < files.length; i++) {
    const response = await uploadFile(files[i]); //  + '-' + files[i].originalname
    // construct url
    const url = `https://arweave.net/${response.id}`;
    // prepare url for response
    urls.push(url);
    const variables = {
      input: {
        url,
        thingId: args.thingId
      }
    }
    // send url to everything api to construct Media objects and tags
    const { error } = await fetchEverything({ query: createMediaMutation, variables });
    if (error) {
      console.error("Error creating media", error.message);
      throw new Error(`Error creating media ${error.message}`)
    }
  }
  const response = {
    urls
  }
  return response;
}
