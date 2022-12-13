import { uploadFileToArweave } from "@mintbase-js/storage";
import { MEDIA_UPLOAD_ENDPOINT, STORAGE_TYPE } from "../constants";
import { CreateMediaArgs, CreateMediaResponse } from "./media";


export async function createMediaOnCloud(thingId: string, args: CreateMediaArgs): Promise<any> {
  try {
    const formData = new FormData();

    formData.append("thingId", thingId);
    for (let i = 0; i < args.files?.length; i++) {
      formData.append("files", args.files[i].data);
    }

    await uploadFilesToCloud(formData);

  } catch (error: unknown) {
    // TODO: Error handling from api
    console.log(error)
  }
}

async function uploadFilesToCloud(
  formData: FormData
): Promise<any> { //TODO, set type for data, what does it look like?
  // TODO: This will require an access token
  const response = await fetch(MEDIA_UPLOAD_ENDPOINT, {
    method: "POST",
    body: formData
  })
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    // 400 error if unsucessful multer upload, this will also show too many file upload error
    // 500 if something else
    // { 
    //   message,
    //   errorMessage
    //   errorCode // This one is helpful for diagnosing multer problem for client
    // }
    throw new Error(message); 
  }
  const data = await response.json();
  return data;
}

export async function createMediaOnBlockchain(thingId: string, args: CreateMediaArgs): Promise<any> {
  for (let i = 0; i < args.files?.length; i++) {
      const response = await uploadFileToArweave(args.files[i].data, `${Date.now()}`); // new Date().toISOString() + '-' + file.originalname
      // This will throw Max upload error message
      // Or some HTTP error... not sure what to do with that. If it is Max upload, probably wanna just show that back to the user?

      // now we have a url
      // make a request to createMedia, which is a plugin that will auto create the tag as well if provided
  }
}
