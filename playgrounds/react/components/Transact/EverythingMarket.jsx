import { listingsQuery } from "@everything-sdk-js/data";
import { fetchEverything } from "@everything-sdk-js/sdk";
import { useWallet } from "@mintbase-js/react";
import { useState } from "react";
import ThingCard from "./ThingCard";

function EverythingMarket() {
  const [things, setThings] = useState([]);
  const { activeAccountId} = useWallet();

  const fetchEverythingMarketListings = async () => {
    const tokens = await fetchEverything({
      query: listingsQuery,
      variables: null,
    });
    if (!tokens.error) {
      setThings(tokens.data.listings);
    } else {
      console.log(tokens.error);
    }
  };

  return (
    <>
      <button className="btn" onClick={fetchEverythingMarketListings}>
        fetch everything market listings
      </button>
      <div className="grid grid-cols-4 mt-4 gap-1">
        {things.map((it) => (
          // have it pass props individually rather than full thing
          <ThingCard key={it.metadata_id} thing={it} showOwnerActions={it.listed_by === activeAccountId} showMint={false} showDelist={true} />
        ))}
      </div>
    </>
  );
}

export default EverythingMarket;
