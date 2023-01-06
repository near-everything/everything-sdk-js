import { listingsQuery } from "@everything-sdk-js/data";
import { fetchEverything } from "@everything-sdk-js/sdk";
import { useWallet } from "@mintbase-js/react";
import { useQuery } from "@tanstack/react-query";
import ThingCard from "./ThingCard";
import SingleSelect from "../SingleSelect";
import { useState } from "react";

const marketOptions = [
  {
    label: "OnlyPants",
    value: 1,
    description: "a market exclusive to pants available in the ecosystem",
  },
  {
    label: "The Shirt",
    value: 2,
    description: "a market exclusive to shirts available in the ecosystem",
  },
];

function EcosystemMarket() {
  const [market, setMarket] = useState(marketOptions[0]);
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
      <div className="">
        <div className="w-56">
          <SingleSelect
            className="basic-single"
            classNamePrefix="select"
            value={market}
            isLoading={isLoading}
            name="market"
            onChange={setMarket}
            options={marketOptions}
          />
        </div>
        <p className="ml-2">{market.description}</p>
      </div>
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

export default EcosystemMarket;
