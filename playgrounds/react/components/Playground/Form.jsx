import { useUser } from "@auth0/nextjs-auth0/client";
import { STORAGE_TYPE } from "@everything-sdk-js/sdk";
import { useState } from "react";
import { useWallet } from "../../../../../mintbase-js/packages/react/lib";
import Characteristics from "./Characteristics";
import Media from "./Media";

function Form() {
  const [files, setFiles] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const { selector } = useWallet();
  const { user } = useUser();
  const [thingId, setThingId] = useState("");
  const [cloud, setCloud] = useState(false);
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
    if (cloud) {
      storage.push(STORAGE_TYPE.CLOUD);
    }
    if (blockchain) {
      storage.push(STORAGE_TYPE.BLOCKCHAIN);
    }
    const createThingData = {
      user,
      wallet,
      storage,
      characteristics,
      files,
    };
    console.log(createThingData);
    // const id = await createThing(createThingData);
    // setThingId(id);
  };

  return (
    <div className="flex flex-col items-center w-full h-full">
      <Media files={files} setFiles={setFiles} />
      <br />
      <Characteristics attributes={attributes} setAttributes={setAttributes} />
      <br />
      <div className="flex flex-col w-1/2">
        <p>storage</p>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">cloud</span>
            <input
              type="checkbox"
              checked={cloud}
              className="checkbox"
              onChange={() => setCloud(!cloud)}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">blockchain</span>
            <input
              type="checkbox"
              checked={blockchain}
              className="checkbox"
              onChange={() => setBlockchain(!blockchain)}
            />
          </label>
        </div>
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
