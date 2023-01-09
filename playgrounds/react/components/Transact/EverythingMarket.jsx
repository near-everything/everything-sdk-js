import { listingsQuery } from "@everything-sdk-js/data";
import { fetchEverything } from "@everything-sdk-js/sdk";
import { useWallet } from "@mintbase-js/react";
import { useQuery } from "@tanstack/react-query";
import ThingCard from "./ThingCard";

function EverythingMarket() {
  const { activeAccountId } = useWallet();
  const { data, isLoading } = useQuery(["listings"], async () => {
    const { data, error } = await fetchEverything({
      query: listingsQuery,
    });
    if (!error) {
      return data.listings;
    } else {
      console.log(error);
    }
  });

  return (
    <div className="flex flex-col">
      <p className="text-2xl ml-2">everything market</p>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <div className="grid grid-cols-4 mt-4 gap-1">
          {data?.map((it) => (
            // have it pass props individually rather than full thing
            <ThingCard
              key={it.metadata_id}
              thing={it}
              thingId={it.thing.id}
              tags={it.thing.tags}
              showOwnerActions={it.listed_by === activeAccountId}
              showMint={false}
              showDelist={true}
              contractId={it.nft_contract_id}
              tokenId={it.token_id}
              referrerId={"everything.mintspace2.testnet"}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default EverythingMarket;
