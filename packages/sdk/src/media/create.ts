import { MEDIA_UPLOAD_ENDPOINT, STORAGE_TYPE } from "../constants";
import { CreateMediaArgs, CreateMediaResponse } from "./media";

// Or this could take in its own arg type? And createThing trasnforms { ..., thingId }
export async function createMedia(thingId: string, args: CreateMediaArgs): Promise<CreateMediaResponse> {

  const response: CreateMediaResponse = {
    data: undefined,
    error: undefined,
  };

  // TODO: option to store offline rather than cloud
  // if (args.storage.includes(STORAGE_TYPE.OFFLINE)) { }

  if (args.storage.includes(STORAGE_TYPE.CLOUD)) {
    // store images on cloud
    const { data, error } = await createOnCloud(thingId, args);

    if (error) {
      // error, load response and do not continue
      response.error = error;
      return response;
    } else {
      // load id into response data
      response.data = { thingId: data.createThing.thing.id };
    }
  }

  if (args.storage.includes(STORAGE_TYPE.BLOCKCHAIN)) {
    // store images on blockchain
    const result = await createOnArweave(thingId, args);
  }
  return response;
}

async function createOnCloud(thingId: string, args: CreateMediaArgs): Promise<{ data: any | null, error: undefined | Error }> {
  // construct form data out of files for multipart/form-data upload
  const formData = new FormData();
  formData.append("thingId", thingId)
  for (let i = 0; i < args.files?.length; i++) {
    formData.append("files", args.files[i].data);
  }
  let data;
  let error;
  // make request to api
  await fetch(MEDIA_UPLOAD_ENDPOINT, {
    method: "POST",
    body: formData
  }).then((res) => {
    if (res.status >= 400 && res.status < 600) {
      // TODO: Error handling, what will server be responding?
      throw new Error("Bad response from server");
    }
    return res.json();
  }).then((data) => {
    // set data
    data = data;
  }).catch((error) => {
    // set error
    console.error(error);
    error = error;
  });

  return { data, error };
}

async function createOnArweave(thingId: string, args: any) {
  try {
    // Store on arweave using Bundlr
    // Now what do we do with this url?
    // We save it down to offline
    // and then maybe we then make a request to server, or does it get saved to the NFT?
    // call mintbase
  } catch (e) {
    console.log(e); // TODO: error handling
  }
}
