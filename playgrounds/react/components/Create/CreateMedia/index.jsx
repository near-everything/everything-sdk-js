import { useUser } from "@auth0/nextjs-auth0/client";
import { createMediaOnBlockchain, createMediaOnCloud, STORAGE_TYPE } from "@everything-sdk-js/sdk";
import { useState } from "react";
import Response from "../../Explore/Response";
import RadioButton from "../../RadioButton";
import Media from "./Media";

function CreateMedia({ defaultThingId }) {
  const [files, setFiles] = useState([]);
  const [storage, setStorage] = useState(STORAGE_TYPE.BLOCKCHAIN);
  const [data, setData] = useState("");
  const [error, setError] = useState("");
  const [thingId, setThingId] = useState(defaultThingId);
  const { user } = useUser();

  const handleSubmit = async () => {
    setData("");
    setError("");
    const media = files.map((it) => (it = it.data));

    if (storage === STORAGE_TYPE.CLOUD) {
      const createMediaData = {
        user,
        thingId,
      };
      try {
        const result = await createMediaOnCloud(media, createMediaData);
        setData(result);
      } catch (err) {
        setError(err.message);
      }
    } else if (storage === STORAGE_TYPE.BLOCKCHAIN) {
      const createMediaData = {
        thingId,
      };
      try {
        const result = await createMediaOnBlockchain(media, createMediaData);
        setData(result);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <>
      <div className="flex justify-center w-full">
        <Media files={files} setFiles={setFiles} />
      </div>
      <div className="flex flex-row items-center gap-4">
        <p>storage:</p>
        <RadioButton
          label={"offline"}
          checked={storage === STORAGE_TYPE.OFFLINE}
          setChecked={() => setStorage(STORAGE_TYPE.OFFLINE)}
          disabled={true}
          group={"createMedia"}
        />
        <RadioButton
          label={"cloud"}
          checked={storage === STORAGE_TYPE.CLOUD}
          setChecked={() => setStorage(STORAGE_TYPE.CLOUD)}
          group={"createMedia"}
        />
        <RadioButton
          label={"blockchain"}
          checked={storage === STORAGE_TYPE.BLOCKCHAIN}
          setChecked={() => setStorage(STORAGE_TYPE.BLOCKCHAIN)}
          group={"createMedia"}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder={"associate thingId"}
          value={thingId}
          onChange={(e) => setThingId(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <br />
      <button
        className="btn w-32"
        onClick={handleSubmit}
        disabled={thingId === "" || files.length < 1}
      >
        submit
      </button>
      <div className="">
        <Response data={data} error={error} />
      </div>
    </>
  );
}

export default CreateMedia;
