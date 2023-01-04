import { useWallet } from "@mintbase-js/react";
import { depositStorage, execute } from "@mintbase-js/sdk";
import Head from "next/head";
import Box from "../../components/Box";
import Layout from "../../components/Layout";
import EverythingMarket from "../../components/Transact/EverythingMarket";
import PersonalWallet from "../../components/Transact/PersonalWallet";

export default function Transact() {
  const { selector } = useWallet();

  const handleDepositStorage = async () => {
    const wallet = await selector.wallet();

    await execute(
      depositStorage({
        listAmount: 10,
        marketId: "market-v2-beta.mintspace2.testnet",
      }),
      { wallet }
    );
  };

  return (
    <>
      <Head>
        <title>everything transact</title>
        <meta
          name="description"
          content="sample marketplace for everything sdk js"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center w-full h-full">
        <p className="text-4xl m-8">transact</p>
        <div className="h-full md:w-3/4">
          <div className="flex mb-2 h-32 w-full">
            <Box>
              <button className="btn" onClick={handleDepositStorage}>
                deposit storage
              </button>
            </Box>
          </div>
          <div className="grid grid-cols-2 gap-2 h-full">
            <div className="flex">
              <Box>
                <PersonalWallet />
              </Box>
            </div>
            <div className="flex flex-col gap-2">
              <Box>
                <p>shows all your personal, listed items</p>
                <p>
                  will give you the opportunity to delist, change price, burn,
                  or transfer
                </p>
              </Box>
              <Box>
                <p>will have a dropdown to select a marketplace</p>
                <p>type = clothing</p>
                <p>brand = sample</p>
                <p>style = cool</p>
                <p>
                  will give you the opportunity to delist, change price, burn,
                  or transfer
                </p>
              </Box>
              <Box>
                <EverythingMarket />
              </Box>
            </div>
            {/* <Request
            query={query}
            setQuery={setQuery}
            param={param}
            setParam={setParam}
            runQuery={runQuery}
          /> */}
            <br />
            {/* <div className="h-96">
            <Response data={data} error={error} />
          </div> */}
          </div>
        </div>
      </main>
    </>
  );
}

Transact.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
