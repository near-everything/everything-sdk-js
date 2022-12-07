import { useState } from "react";
import { createThing } from "@everything-sdk-js/sdk";
import { useWallet } from "../../../../../mintbase-js/packages/react/lib";
import { useUser } from "@auth0/nextjs-auth0/client";
import Media from "./Media";

function Form() {
  const [files, setFiles] = useState([]);
  const { selector } = useWallet();
  const { user } = useUser();

  const characteristics = [
    {
      attributeId: "1",
      optionId: "2",
    },
  ];

  const OFFLINE = "OFFLINE";
  const CLOUD = "CLOUD";
  const BLOCKCHAIN = "BLOCKCHAIN";

  const handleSubmit = async () => {
    const wallet = await selector.wallet();
    const createThingData = {
      user,
      wallet,
      storage: [OFFLINE, CLOUD, BLOCKCHAIN],
      characteristics,
      files
    }
    await createThing(createThingData);
  };

  return (
      <div className="flex flex-col items-center w-full h-full">
        <Media files={files} setFiles={setFiles} />
        <br />
        <button className="btn w-32" onClick={handleSubmit}>
          submit
        </button>
      </div>
  );
}

export default Form;
