import { useUser } from "@auth0/nextjs-auth0/client";
import { createThing, STORAGE_TYPE } from "@everything-sdk-js/sdk";
import { useState } from "react";
import Response from "../../Explore/Response";
import RadioButton from "../../RadioButton";
import Characteristics from "./Characteristics";

function CreateThing({ setDefaultThingId }) {
  const [attributes, setAttributes] = useState([]);
  const [storage, setStorage] = useState(STORAGE_TYPE.CLOUD);
  const [data, setData] = useState("");
  const [error, setError] = useState("");
  const { user } = useUser();

  const handleSubmit = async () => {
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
    const createThingData = {
      storage,
      user,
      characteristics,
    };
    console.log(createThingData);
    try {
      const thingId = await createThing(createThingData);
      setData(thingId);
      setDefaultThingId(thingId);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Characteristics attributes={attributes} setAttributes={setAttributes} />
      <div className="flex flex-row items-center gap-4">
        <p>storage:</p>
        <RadioButton
          label={"offline"}
          checked={storage === STORAGE_TYPE.OFFLINE}
          setChecked={() => setStorage(STORAGE_TYPE.OFFLINE)}
          disabled={true}
          group={"createThing"}
        />
        <RadioButton
          label={"cloud"}
          checked={storage === STORAGE_TYPE.CLOUD}
          setChecked={() => setStorage(STORAGE_TYPE.CLOUD)}
          group={"createThing"}
        />
      </div>
      <br />
      <button
        className="btn w-32"
        onClick={handleSubmit}
        disabled={attributes.length < 1}
      >
        submit
      </button>
      <div className="">
        <Response data={data} error={error} />
      </div>
    </>
  );
}

export default CreateThing;
