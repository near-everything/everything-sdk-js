import { useUser } from "@auth0/nextjs-auth0/client";
import {
  createMediaOnBlockchain,
  createThing,
  STORAGE_TYPE,
} from "@everything-sdk-js/sdk";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { PulseLoader } from "react-spinners";
import Media from "./Create/CreateMedia/Media";
import Characteristics from "./Create/CreateThing/Characteristics";

function CreateThingModal() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [attributes, setAttributes] = useState([]);
  const { user } = useUser();
  const queryClient = useQueryClient();

  const mapAttributes = () => {
    return attributes
      ?.filter(
        (it) => it.options?.value !== undefined && it.options?.value !== null
      )
      .map((attr) => {
        return {
          attributeId: parseInt(attr.value),
          optionId: parseInt(attr.options.value),
        };
      });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const characteristics = mapAttributes();
    const createThingData = {
      storage: [STORAGE_TYPE.CLOUD],
      user,
      characteristics,
    };
    try {
      const { thingId } = await createThing(createThingData);
      const createMediaData = {
        // user,
        thingId: thingId,
      };
      const media = files.map((it) => (it = it.data));
      await createMediaOnBlockchain(media, createMediaData);
    } catch (err) {
      console.log(err.message);
    }
    await queryClient.refetchQueries(["thingsByOwner", user.sub]);
    document.getElementById("create-modal").checked = false;
    setLoading(false);
  };

  return (
    <>
      <input type="checkbox" id="create-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="create-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div className="flex flex-col w-full">
            <div className="flex justify-center">
              <p className="text-2xl mb-2">create thing</p>
            </div>
            {loading ? (
              <>
                <div className="flex flex-1 justify-center items-center h-full">
                  <PulseLoader
                    size={10}
                    color={"#e5e7eb"}
                    loading={true}
                    speedMultiplier={1.5}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-center w-full">
                  <Media files={files} setFiles={setFiles} />
                </div>
                <Characteristics
                  attributes={attributes}
                  setAttributes={setAttributes}
                />
                <br />
                <button
                  className="btn w-32"
                  onClick={handleSubmit}
                  disabled={attributes.length < 1 || files.length < 1}
                >
                  submit
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateThingModal;
