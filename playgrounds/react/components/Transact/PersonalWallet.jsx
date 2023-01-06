import { useUser } from "@auth0/nextjs-auth0/client";
import { getThingsByOwner } from "@everything-sdk-js/data";
import { useQuery } from "@tanstack/react-query";
import AuthBar from "../AuthBar";
import CreateThingModal from "../CreateThingModal";
import ThingCard from "./ThingCard";

function PersonalWallet() {
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

  return (
    <div className="flex flex-col">
      <p className="text-2xl ml-2">personal inventory</p>
      <AuthBar />
      <label htmlFor="create-modal" className="btn">create</label>

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
                showMint={!it.nft}
                showOwnerActions={true}
                showDelist={
                  it.nft &&
                  it.nft.listings?.length > 0 &&
                  it.nft.listings[0].unlisted_at === null
                }
                contractId={it.nft?.nft_contract_id}
                tokenId={it.nft?.token_id}
              />
            </div>
          ))}
        </div>
      )}
      <CreateThingModal />
    </div>
  );
}

export default PersonalWallet;
