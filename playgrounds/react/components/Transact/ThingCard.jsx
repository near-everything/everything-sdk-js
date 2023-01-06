import { useUser } from "@auth0/nextjs-auth0/client";
import { buyThing, mintThing } from "@everything-sdk-js/sdk";
import { useWallet } from "@mintbase-js/react";
import { delist, execute, list } from "@mintbase-js/sdk";
import Image from "next/image";
import { useState } from "react";

function ThingCard({
  thing,
  thingId,
  tags,
  showOwnerActions,
  showMint,
  showDelist,
  contractId,
  tokenId,
  referrerId,
}) {
  const { selector, activeAccountId } = useWallet();
  const [showOptions, setShowOptions] = useState(false);
  const { user } = useUser();

  const handleListThing = async () => {
    const wallet = await selector.wallet();
    const args = {
      nftContractId: contractId,
      price: "100",
      tokenId: tokenId,
      marketId: "market-v2-beta.mintspace2.testnet",
    };
    await execute({ wallet: wallet }, list(args));
  };

  const handleDelistThing = async () => {
    const wallet = await selector.wallet();
    const args = {
      nftContractId: contractId,
      tokenIds: [tokenId],
      marketId: "market-v2-beta.mintspace2.testnet",
    };
    await execute({ wallet: wallet }, delist(args));
  };

  const handleMintThing = async () => {
    const wallet = await selector.wallet();
    const args = {
      wallet,
      ownerId: activeAccountId,
      nftContractId: "everything.mintspace2.testnet",
    };
    await mintThing(thing.id, args);
  };

  const handleBuyThing = async () => {
    const wallet = await selector.wallet();
    const args = {
      thingId,
      user,
      price: "100",
      contractId,
      tokenId,
      referrerId,
      wallet
    };
    await buyThing(args);
  };

  const getImage = () => {
    if (tags?.length > 0) {
      return tags[0].media.mediaUrl;
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
              {showOwnerActions ? (
                <div className="flex flex-col flex-1">
                  {showMint ? (
                    <button
                      className="btn btn-primary"
                      onClick={handleMintThing}
                    >
                      Mint
                    </button>
                  ) : (
                    <>
                      {showDelist ? (
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
                  )}
                </div>
              ) : (
                <div className="flex flex-col flex-1">
                  <button className="btn btn-primary" onClick={handleBuyThing}>
                    Buy
                  </button>
                </div>
              )}

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
