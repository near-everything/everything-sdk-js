import Head from "next/head";
import Box from "../../components/Box";
import Layout from "../../components/Layout";
import EcosystemMarket from "../../components/Transact/EcosystemMarket";
import EverythingMarket from "../../components/Transact/EverythingMarket";
import PersonalMarket from "../../components/Transact/PersonalMarket";
import PersonalWallet from "../../components/Transact/PersonalWallet";

export default function Transact() {
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

      <main className="flex flex-col flex-1 items-center">
        <div className="flex flex-1 gap-2 md:w-4/5 mt-8">
          {/* <div className="flex mb-2 h-32 w-full">
            <Box>
              <button className="btn" onClick={handleDepositStorage}>
                deposit storage
              </button>
            </Box>
          </div> */}
          <div className="flex flex-1 flex-col">
            <Box>
              <PersonalWallet />
            </Box>
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <Box>
              <PersonalMarket />
            </Box>
            <Box>
              <EcosystemMarket />
            </Box>
            <Box>
              <EverythingMarket />
            </Box>
          </div>
        </div>
      </main>
    </>
  );
}

Transact.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
