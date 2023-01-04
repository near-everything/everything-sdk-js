import { useState } from "react";
import ThingCard from "./ThingCard";
import { ownedTokens } from "@mintbase-js/data";
import { useWallet } from "@mintbase-js/react";

function EverythingMarket() {
  const [things, setThings] = useState([]);
  const { activeAccountId } = useWallet();

  const fetchEverythingMarketListings = async () => {
    const tokens = await ownedTokens(activeAccountId, { limit: 20 });
    setThings(tokens);
  };

  return (
    <>
      <button className="btn" onClick={fetchEverythingMarketListings}>
        fetch everything market listings
      </button>
      <div className="flex flex-row grid-cols-4">
        {things.map((it) => (
          <ThingCard key={it.id} thing={it} />
        ))}
      </div>
    </>
  );
}

export default EverythingMarket;
