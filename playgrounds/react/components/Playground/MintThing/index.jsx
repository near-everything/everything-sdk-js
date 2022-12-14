import { mintThing } from "@everything-sdk-js/sdk";
import { useWallet } from "@mintbase-js/react";
import { useState } from "react";
import Response from "../../Explore/Response";

function MintThing({ defaultThingId }) {
  const [thingId, setThingId] = useState(defaultThingId);
  const [data, setData] = useState("");
  const [error, setError] = useState("");
  const { selector, activeAccountId } = useWallet();

  const handleSubmit = async () => {
    setData("");
    setError("");
    const wallet = await selector.wallet();
    const mintThingData = {
      wallet,
      ownerId: activeAccountId,
      nftContractId: "everything.mintspace2.testnet",
    };
    try {
      const result = await mintThing(thingId, mintThingData);
      setData(result);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div>
        <input
          type="text"
          placeholder={"thing id to mint"}
          value={thingId}
          onChange={(e) => setThingId(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <br />
      <button
        className="btn w-32"
        onClick={handleSubmit}
        disabled={thingId === ""}
      >
        submit
      </button>
      <div className="">
        <Response data={data} error={error} />
      </div>
    </>
  );
}

export default MintThing;
