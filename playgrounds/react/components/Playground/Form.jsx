import { useUser } from "@auth0/nextjs-auth0/client";
import { createThing, STORAGE_TYPE } from "@everything-sdk-js/sdk";
import { useState } from "react";
import { useWallet } from "../../../../../mintbase-js/packages/react/lib";
import Characteristics from "./Characteristics";
import Media from "./Media";
import StorageCheckbox from "./StorageCheckbox";

function Form() {
  const [files, setFiles] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const { selector } = useWallet();
  const { user } = useUser();
  const [thingId, setThingId] = useState("");
  const [offline, setOffline] = useState(false);
  const [cloud, setCloud] = useState(true);
  const [blockchain, setBlockchain] = useState(false);

  const handleSubmit = async () => {
    const wallet = await selector.wallet();
    const characteristics = attributes
      ?.filter(
        (it) => it.options?.value !== undefined && it.options?.value !== null
      )
      .map((attr) => {
        return {
          attributeId: parseInt(attr.value),
          optionId: parseInt(attr.options.value),
        };
      });
    const storage = [];
    if (offline) {
      storage.push(STORAGE_TYPE.OFFLINE);
    }
    if (cloud) {
      storage.push(STORAGE_TYPE.CLOUD);
    }
    if (blockchain) {
      storage.push(STORAGE_TYPE.BLOCKCHAIN);
    }
    const createThingData = {
      user,
      wallet,
      mintArgs: { nftContractId: "everything.mintspace2.testnet" },
      storage,
      characteristics,
      files,
    };
    console.log(createThingData);
    const { data, error } = await createThing(createThingData);
    console.log(JSON.stringify(data));
    console.log(JSON.stringify(error));
  };

  return (
    <div className="flex flex-col items-center w-full h-full">
      <Media files={files} setFiles={setFiles} />
      <br />
      <Characteristics attributes={attributes} setAttributes={setAttributes} />
      <br />
      <div className="flex flex-col w-1/2">
        <p>storage</p>
        <StorageCheckbox
          name={"offline"}
          disabled
          checked={offline}
          setChecked={() => setOffline(!offline)}
        />
        <StorageCheckbox
          name={"cloud"}
          disabled
          checked={cloud}
          setChecked={() => setCloud(!cloud)}
        />
        <StorageCheckbox
          name={"blockchain"}
          checked={blockchain}
          setChecked={() => setBlockchain(!blockchain)}
        />
      </div>
      <br />
      <button className="btn w-32" onClick={handleSubmit}>
        submit
      </button>
      <div className="flex w-1/2">
        <p>response: {thingId}</p>
      </div>
    </div>
  );
}

export default Form;
