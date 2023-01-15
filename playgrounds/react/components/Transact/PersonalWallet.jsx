import { useUser } from "@auth0/nextjs-auth0/client";
import {
  fetchEverything,
  getThingsByOwner,
  minterQuery
} from "@everything-sdk-js/data";
import { connect } from "@mintbase-js/auth";
import { useWallet } from "@mintbase-js/react";
import { addMinter, depositStorage, execute, InMemoryKeyStore, KeyPair } from "@mintbase-js/sdk";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import AuthBar from "../AuthBar";
import CreateThingModal from "../CreateThingModal";
import ListThingModal from "../ListThingModal";
import ThingCard from "./ThingCard";

function PersonalWallet() {
  const { selector, activeAccountId } = useWallet();
  const [listing, setListing] = useState({});
  const { user } = useUser();
  const { data: isMinter } = useQuery(
    ["minter", activeAccountId],
    async () => {
      const { data, error } = await fetchEverything({
        query: minterQuery,
        variables: { minterId: activeAccountId },
      });
      if (!error) {
        return data.minter;
      } else {
        console.log(error);
      }
    },
    {
      enabled: !!activeAccountId,
    }
  );
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

  const handleAddMinter = async () => {
    const keyStore = new InMemoryKeyStore();
    keyStore.setKey(
      process.env.NEAR_NETWORK,
      "everything.testnet",
      KeyPair.fromString(process.env.NEAR_PRIVATE_KEY)
    );
    const approverAccount = await connect("everything.testnet", keyStore);
    await execute(
      { account: approverAccount },
      addMinter({
        nftContractId: "everything.mintspace2.testnet",
        minterId: activeAccountId,
      })
    );
  };

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
        {!isMinter ? (
          <button className="btn" onClick={handleAddMinter}>
            complete kyc
          </button>
        ) : null}
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
