import { useState } from "react";
import { createThing, STORAGE_TYPE } from "@everything-sdk-js/sdk";
import { useWallet } from "../../../../../mintbase-js/packages/react/lib";
import { useUser } from "@auth0/nextjs-auth0/client";
import Media from "./Media";

function Form() {
  const [files, setFiles] = useState([]);
  const { selector } = useWallet();
  const { user } = useUser();
  const [thingId, setThingId] = useState("");

  const characteristics = [
    {
      attributeId: 1,
      optionId: 1,
    },
  ];


  const handleSubmit = async () => {
    const wallet = await selector.wallet();
    const createThingData = {
      user,
      wallet,
      storage: [
        // STORAGE_TYPE.OFFLINE,
        STORAGE_TYPE.CLOUD,
        // STORAGE_TYPE.NEAR
      ],
      characteristics,
      files
    }
    const id = await createThing(createThingData);
    setThingId(id);

  };

  return (
      <div className="flex flex-col items-center w-full h-full">
        <Media files={files} setFiles={setFiles} />
        <br />
        {thingId}
        <button className="btn w-32" onClick={handleSubmit}>
          submit
        </button>
      </div>
  );
}

export default Form;
