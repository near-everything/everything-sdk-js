import { useWallet } from "@mintbase-js/react";
import { execute, list } from "@mintbase-js/sdk";
import { useState } from "react";
import { PulseLoader } from "react-spinners";

function ListThingModal({ listing }) {
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const { selector } = useWallet();

  const listThing = async () => {
    setLoading(true);
    const wallet = await selector.wallet();
    const args = {
      nftContractId: listing.nftContractId,
      price: price.toString(),
      tokenId: listing.tokenId,
      marketId: "market-v2-beta.mintspace2.testnet",
    };
    await execute({ wallet: wallet }, list(args));
    setLoading(false);
  };

  return (
    <>
      <input type="checkbox" id="list-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="list-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div className="flex flex-col w-full">
            <div className="flex justify-center">
              <p className="text-2xl mb-2">list thing</p>
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
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">price</span>
                  </label>
                  <input
                    type="number"
                    value={price}
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <br />
                <button className="btn w-32" onClick={listThing}>
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

export default ListThingModal;
