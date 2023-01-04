import { useWallet } from "@mintbase-js/react";
import { delist, execute, list } from "@mintbase-js/sdk";
import { mintThing } from "@everything-sdk-js/sdk";
import Image from "next/image";
import { useState } from "react";

function ThingCard({ thing }) {
  const { selector, activeAccountId } = useWallet();
  const [showOptions, setShowOptions] = useState(false);

  const handleListThing = async () => {
    const wallet = await selector.wallet();
    const args = {
      nftContractId: thing.node.nft.nft_contract_id,
      price: "100",
      tokenId: thing.node.nft.token_id,
      marketId: "market-v2-beta.mintspace2.testnet",
    };
    await execute(list(args), { wallet: wallet });
  };

  const handleDelistThing = async () => {
    const wallet = await selector.wallet();
    const args = {
      nftContractId: thing.node.nft.nft_contract_id,
      tokenId: thing.node.nft.token_id,
      marketId: "market-v2-beta.mintspace2.testnet",
    };
    await execute(delist(args), { wallet: wallet });
  };

  const handleMintThing = async () => {
    const wallet = await selector.wallet();
    const mintThingData = {
      wallet,
      ownerId: activeAccountId,
      nftContractId: "everything.mintspace2.testnet",
    };
    await mintThing(thing.node.id, mintThingData);
  };

  const getImage = () => {
    if (thing.node.tags?.edges?.length > 0) {
      return thing.node.tags.edges[0].node.media.mediaUrl;
    } else {
      return "https://placeimg.com/400/225/arch";
    }
  };

  return (
    <div className="bg-gray-800 border-black border-2 rounded-xl shadow-xl">
      <div className="flex flex-row items-center">
        <div className="relative w-56 h-56">
          {showOptions ? (
            <div className="flex flex-col justify-between h-full p-2">
              <div className="flex flex-col flex-1">
                {thing?.node?.nft ? (
                  <>
                    {thing?.node?.nft?.listings?.length > 0 ? (
                      <button
                        className="btn btn-secondary"
                        onClick={handleDelistThing}
                      >
                        Delist
                      </button>
                    ) : (
                      <button
                        className="btn btn-secondary"
                        onClick={handleListThing}
                      >
                        List
                      </button>
                    )}
                  </>
                ) : (
                  <button className="btn btn-primary" onClick={handleMintThing}>
                    Mint
                  </button>
                )}
              </div>
              <button
                className="btn btn-accent"
                onClick={() => setShowOptions(!showOptions)}
              >
                show image
              </button>
            </div>
          ) : (
            <div
              className="cursor-pointer hover:opacity-75"
              onClick={() => setShowOptions(!showOptions)}
            >
              <Image
                src={getImage()}
                alt=""
                fill
                style={{ objectFit: "cover" }}
                className="rounded-xl"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ThingCard;
