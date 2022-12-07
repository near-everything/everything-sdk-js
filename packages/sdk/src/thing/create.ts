import { execute, mint, MintArgs } from "../../../../../mintbase-js/packages/sdk/src";
import { CreateThingArgs } from "./thing";

export async function createThing(args: any) {

  if (args.storage.includes("OFFLINE")) {
    console.log("storing offline");
    // should we always store offline first?
  }

  if (args.storage.includes("CLOUD")) {
    console.log("storing on cloud");
    
    const formData = new FormData();
    formData.append("characteristics", JSON.stringify(args.characteristics));
    formData.append("creatorId", args.user?.sub);
    for (let i = 0; i < args.files?.length; i++) {
      formData.append("files", args.files[i].data);
    }
    // call the api, this will need the accesstoken, which will be grabbed from context
    fetch("http://localhost:4050/api/thing", {
      method: "POST",
      body: formData
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  if (args.storage.includes("BLOCKCHAIN")) {
    console.log("storing on blockchain");
    // Mintbase SDK
    // this will need the wallet
    const mintArgs: MintArgs = { nftContractId: "everything.testnet", metadata: { reference: "hello" } }
    await execute(
      mint(mintArgs), { wallet: args.wallet }
    );
  }
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 2000);
  });
}