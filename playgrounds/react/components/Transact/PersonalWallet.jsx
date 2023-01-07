import { useUser } from "@auth0/nextjs-auth0/client";
import { getThingsByOwner } from "@everything-sdk-js/data";
import { useWallet } from "@mintbase-js/react";
import { depositStorage, execute } from "@mintbase-js/sdk";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import AuthBar from "../AuthBar";
import CreateThingModal from "../CreateThingModal";
import ListThingModal from "../ListThingModal";
import ThingCard from "./ThingCard";

function PersonalWallet() {
  const { selector } = useWallet();
  const [listing, setListing] = useState({});
  const { user } = useUser();
  const { data, isLoading } = useQuery(
    ["thingsByOwner", user?.sub],
    async () => {
      const {
        data: { things },
      } = await getThingsByOwner(user?.sub);
      return things;
    },
    {
      enabled: !!user?.sub,
    }
  );

  const handleDepositStorage = async () => {
    const wallet = await selector.wallet();

    await execute(
      { wallet },
      depositStorage({
        listAmount: 10,
        marketId: "market-v2-beta.mintspace2.testnet",
      })
    );
  };

  // const handleAddMinter = async () => {
  //   const wallet = await selector.wallet();
  //   await execute(
  //     { wallet },
  //     addMinter({
  //       nftContractId: "everything.mintspace2.testnet",
  //       minterId: "efiz.testnet",
  //     })
  //   );
  // };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between">
        <p className="text-2xl ml-2">personal inventory</p>
        <label htmlFor="create-modal" className="btn">
          create thing
        </label>
      </div>
      <div className="flex justify-between mt-2">
        <AuthBar />
        <button className="btn" onClick={handleDepositStorage}>
          deposit storage
        </button>
      </div>

      {isLoading ? (
        <p>Loading</p>
      ) : (
        <div className="grid grid-cols-4 mt-4 gap-1">
          {data?.map((it) => (
            <div key={it.id}>
              <ThingCard
                thing={it}
                thingId={it.id}
                tags={it.tags}
                showMint={it.nft === null}
                showOwnerActions={true}
                showDelist={false}
                contractId={it.nft?.nft_contract_id}
                tokenId={it.nft?.token_id}
                setListing={setListing}
              />
            </div>
          ))}
        </div>
      )}
      <ListThingModal listing={listing} />
      <CreateThingModal />
    </div>
  );
}

export default PersonalWallet;
