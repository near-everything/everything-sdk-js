import { useUser } from "@auth0/nextjs-auth0/client";
import { getThingsByOwner } from "@everything-sdk-js/data";
import { useState } from "react";
import ThingCard from "./ThingCard";

function PersonalWallet() {
  const [things, setThings] = useState([]);
  const { user, isLoading } = useUser();

  const fetchPersonalThings = async () => {
    const tokens = await getThingsByOwner(user.sub);
    setThings(tokens?.data?.things?.edges);
  };

  return (
    <>
      {user ? (
        <>
          <button
            className="btn"
            onClick={fetchPersonalThings}
            disabled={isLoading}
          >
            fetch personal things
          </button>
          <div className="grid grid-cols-4 mt-4">
            {things?.map((it) => (
              <div key={it.node.id}>
                <ThingCard thing={it} />
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>not logged in</p>
      )}
    </>
  );
}

export default PersonalWallet;
