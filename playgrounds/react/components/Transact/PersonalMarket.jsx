import { listingsByListerQuery } from "@everything-sdk-js/data";
import { fetchEverything } from "@everything-sdk-js/sdk";
import { useWallet } from "@mintbase-js/react";
import { useState } from "react";
import ThingCard from "./ThingCard";

function PersonalMarket() {
  const [things, setThings] = useState([]);
  const { activeAccountId } = useWallet();

  const fetchPersonalMarketListings = async () => {
    const tokens = await fetchEverything({
      query: listingsByListerQuery,
      variables: { listerId: activeAccountId },
    });
    if (!tokens.error) {
      setThings(tokens.data.activeListingsByLister);
    } else {
      console.log(tokens.error);
    }
  };

  return (
    <>
      <button className="btn" onClick={fetchPersonalMarketListings}>
        fetch personal market listings
      </button>
      <div className="grid grid-cols-4 mt-4 gap-1">
        {things.map((it) => (
          // have it pass props individually rather than full thing
          <ThingCard key={it.metadata_id} thing={it} showOwnerActions={true} showMint={false} showDelist={true} />
        ))}
      </div>
    </>
  );
}

export default PersonalMarket;
