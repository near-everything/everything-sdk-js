import { useUser } from "@auth0/nextjs-auth0/client";
import { createThing, STORAGE_TYPE } from "@everything-sdk-js/sdk";
import { useState } from "react";
import { useWallet } from "@mintbase-js/react";
import Characteristics from "./CreateThing/Characteristics";

import StorageCheckbox from "./StorageCheckbox";
import Response from "../Explore/Response";

function Form() {
  const [files, setFiles] = useState([]);
  
  const { selector } = useWallet();
  const { user } = useUser();
  const [data, setData] = useState("");
  const [error, setError] = useState("");
  const [offline, setOffline] = useState(false);
  const [cloud, setCloud] = useState(true);
  const [blockchain, setBlockchain] = useState(false);
  const [arweave, setArweave] = useState(false);

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
    if (arweave) {
      storage.push("ARWEAVE");
    }
    const createThingData = {
      storage,
      user,
      characteristics,
      files: files.map((it) => (it = it.data)),
      wallet,
      ownerId: "everything.testnet",
      nftContractId: "everything.mintspace2.testnet",
    };
    console.log(createThingData);
    const { data, error } = await createThing(createThingData);
    console.log(JSON.stringify(data));
    if (data) {
      setData(data.thingId);
      setError(data.receiptId);
    }
    console.log(JSON.stringify(error));
  };

  return (
    <div className="flex flex-col items-center w-full h-full mb-32">
      
      <br />
      <div className="flex flex-col w-full">
        
        <br />
        <div>
          <p>thing data storage</p>
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
        </div>
        <br />

        <br />
        <span className="flex justify-between">
          <p>store media on chain?</p>
          <input
            type="checkbox"
            className="toggle toggle-success"
            checked={arweave}
            onChange={() => setArweave(!arweave)}
          />
        </span>
      </div>
      <br />
      <button className="btn w-32" onClick={handleSubmit}>
        submit
      </button>
      <div className="flex flex-col w-1/2 h-32">
        <Response data={data} error={error} />
        <span className="flex justify-between mt-2">
          <p>mint reference on chain?</p>
          <input
            type="checkbox"
            className="toggle toggle-success"
            checked={blockchain}
            onChange={() => setBlockchain(!blockchain)}
          />
        </span>
      </div>
    </div>
  );
}

export default Form;
