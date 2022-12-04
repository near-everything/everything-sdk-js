import { useState } from "react";
import { createThing } from "@everything-sdk-js/sdk";
import Media from "./Media";

function Form() {
  const [files, setFiles] = useState([]);

  const characteristics = [
    {
      attributeId: "1",
      optionId: "2",
    },
  ];

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("characteristics", JSON.stringify(characteristics));
    formData.append("creatorId", "user123");
    formData.append("privacySetting", "PRIVATE");
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i].data);
    }
    await createThing(formData);
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
