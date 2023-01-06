import { listingsByListerQuery } from "@everything-sdk-js/data";
import { fetchEverything } from "@everything-sdk-js/sdk";
import { useWallet } from "@mintbase-js/react";
import { useQuery } from "@tanstack/react-query";
import ThingCard from "./ThingCard";

function PersonalMarket() {
  const { activeAccountId } = useWallet();
  const { data, isLoading } = useQuery(
    ["listingsByLister", activeAccountId],
    async () => {
      const { data, error } = await fetchEverything({
        query: listingsByListerQuery,
        variables: { listerId: activeAccountId },
      });
      if (!error) {
        return data.activeListingsByLister;
      } else {
        console.log(error);
      }
    },
    {
      enabled: !!activeAccountId
    }
  );

  return (
    <div className="flex flex-col">
      <p className="text-2xl ml-2">personal market</p>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <div className="grid grid-cols-4 mt-4 gap-1">
          {data?.map((it) => (
            <ThingCard
              key={it.metadata_id}
              thing={it}
              thingId={it.thing.id}
              tags={it.thing.tags}
              showOwnerActions={true}
              showMint={false}
              showDelist={true}
              contractId={it.nft_contract_id}
              tokenId={it.token_id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default PersonalMarket;
