import { uploadFileToArweave } from "@mintbase-js/storage";
import { MEDIA_UPLOAD_ENDPOINT, STORAGE_TYPE } from "../constants";
import { fetchEverything } from "../utils";
import { createMediaMutation } from "./create.mutation";
import { CreateMediaArgs, CreateMediaResponse } from "./media";

type CreateMediaCloudArgs = {
  user: any,
  thingId?: string
}

export async function createMediaOnCloud(files: File[], args: CreateMediaCloudArgs): Promise<any> {
  try {
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

    const response = await uploadFilesToCloud(formData);
    // TODO: what should this return?
  } catch (error: unknown) {
    // TODO: Error handling from api
    console.log(error)
  }
}

async function uploadFilesToCloud(
  formData: FormData
) {
  // TODO: This will require an access token
  const response = await fetch(MEDIA_UPLOAD_ENDPOINT, {
    method: "POST",
    body: formData
  })
  const data = await response.json();
  console.log(response.ok)
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

export async function createMediaOnBlockchain(files: File[], args: CreateMediaBlockchainArgs): Promise<any> {
  for (let i = 0; i < files.length; i++) {
      const response = await uploadFileToArweave(files[i], `${new Date().toISOString()}`); //  + '-' + files[i].originalname
      const url = `https://arweave.net/${response.id}`;
      const variables = {
        input: {
          url,
          thingId: args.thingId
        }
      }
      const { data, error } = await fetchEverything({ query: createMediaMutation, variables });
      if (error) {
        console.error("Error creating media", error.message);
        // Do anything?
      }

      // This will throw Max upload error message
      // Or some HTTP error... not sure what to do with that. If it is Max upload, probably wanna just show that back to the user?

      // now we have a url
      // make a request to createMedia, which is a plugin that will auto create the tag as well if provided
  }
}
