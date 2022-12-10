import { STORAGE_TYPE } from "../constants";

// Or this could take in its own arg type? And createThing trasnforms { ..., thingId }
export async function createMedia(thingId: string, args: any) {

  if (args.storage.includes(STORAGE_TYPE.OFFLINE)) {
    createOffline(thingId, args);
  }

  if (args.storage.includes(STORAGE_TYPE.CLOUD)) {
    await createOnCloud(thingId, args);
  }

  if (args.storage.includes(STORAGE_TYPE.BLOCKCHAIN)) {
    await createOnArweave(thingId, args);
  }
  return thingId; // I don't think this needs to return anything?
}

function createOffline(thingId: string, args: any) {
  console.log("storing offline");
}

async function createOnCloud(thingId: string, args: any) {
  console.log("storing on cloud");
  try {
    const formData = new FormData();
    formData.append("thingId", thingId)
    for (let i = 0; i < args.files?.length; i++) {
      formData.append("files", args.files[i].data);
    }
    await fetch("http://localhost:4050/api/file/upload", {
      method: "POST",
      body: formData
    }).then((response) => {
      if (response.status >= 400 && response.status < 600) {
        // TODO: Error handling, what will server be responding?
        throw new Error("Bad response from server");
      }
      // Do anything?
    }).catch((e) => console.log(e));
  } catch (e) {
    // What exceptions could this be catching...?
    console.log(e); // TODO: error handling
  }
}

async function createOnArweave(thingId: string, args: any) {
  console.log("storing on blockchain");
  try {
    // Store on arweave using Bundlr
    // Now what do we do with this url?
    // We save it down to offline
    // and then maybe we then make a request to server, or does it get saved to the NFT?
  } catch (e) {
    console.log(e); // TODO: error handling
  }
}
