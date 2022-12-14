import { useUser } from "@auth0/nextjs-auth0/client";
import { createThing, STORAGE_TYPE } from "@everything-sdk-js/sdk";
import { useState } from "react";
import { useWallet } from "@mintbase-js/react";
import Characteristics from "./Characteristics";
import Media from "./Media";
import StorageCheckbox from "./StorageCheckbox";

function Form() {
  const [files, setFiles] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const { selector } = useWallet();
  const { user } = useUser();
  const [thingId, setThingId] = useState("");
  const [receiptId, setReceiptId] = useState("");
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
      storage.push("ARWEAVE")
    }
    const createThingData = {
      storage,
      user,
      characteristics,
      files,
      wallet,
      ownerId: "everything.testnet",
      nftContractId: "everything.mintspace2.testnet",
    };
    console.log(createThingData);
    const { data, error } = await createThing(createThingData);
    console.log(JSON.stringify(data));
    if (data) {
      setThingId(data.thingId);
      setReceiptId(data.receiptId);
    }
    console.log(JSON.stringify(error));
  };

  return (
    <div className="flex flex-col items-center w-full h-full">
      <Media files={files} setFiles={setFiles} />
      <br />
      <div className="flex flex-col w-1/2">
        <Characteristics
          attributes={attributes}
          setAttributes={setAttributes}
        />
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
        <span className="flex justify-between">
          <p>mint reference on chain?</p>
          <input
            type="checkbox"
            className="toggle toggle-success"
            checked={blockchain}
            onChange={() => setBlockchain(!blockchain)}
          />
        </span>
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
      <div className="flex w-1/2 h-64">
        <p>response:</p>
        <p>{thingId}</p>
        <p>{receiptId}</p>
      </div>
    </div>
  );
}

export default Form;
