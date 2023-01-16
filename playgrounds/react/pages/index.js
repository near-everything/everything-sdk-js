import { LoginButton } from "@inrupt/solid-ui-react";
import { useWallet } from "@mintbase-js/react";
import "@near-wallet-selector/modal-ui/styles.css";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../components/Layout";

export default function Home() {
  const { connect, disconnect, activeAccountId, isWalletSelectorSetup } =
    useWallet();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>everything sdk js</title>
        <meta name="description" content="example app for everything sdk js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center h-full w-full">
        <br />
        <br />
        <div className="card w-3/4 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">connect to use the tools</h2>
            <div className="divider"></div>
            <div className="flex grid-cols-2 gap-4 w-full">
              <div className="flex flex-1 flex-col text-center">
                <p className="text-xl">everything</p>
                <LoginButton
                  oidcIssuer="https://login.inrupt.com"
                  redirectUrl={router.pathname}
                  authOptions={{
                    clientName: "everything",
                  }}
                />
              </div>
              <div className="flex flex-1 flex-col text-center">
                <p className="text-xl">NEAR</p>
                <div>
                  {isWalletSelectorSetup ? (
                    <div>
                      {activeAccountId ? (
                        <>
                          <p className="mb-2">
                            you are logged in as {activeAccountId}
                          </p>
                          <button
                            className="btn normal-case"
                            onClick={disconnect}
                          >
                            disconnect
                          </button>
                        </>
                      ) : (
                        <>
                          <p className="mb-2">you are not connected to NEAR</p>
                          <button className="btn normal-case" onClick={connect}>
                            connect
                          </button>
                        </>
                      )}
                    </div>
                  ) : (
                    <div>Waiting for wallet selector components...</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="flex flex-col sm:flex-row grid-cols-3 gap-4 w-3/4 justify-center">
          <div className="card flex-1 bg-base-100 shadow-xl">
            <Link href="/create">
              <div className="card-body">
                <h2 className="card-title">create &rarr;</h2>
                <p>create things and media</p>
              </div>
            </Link>
          </div>
          <div className="card flex-1 bg-base-100 shadow-xl">
            <Link href="/explore">
              <div className="card-body">
                <h2 className="card-title">explore &rarr;</h2>
                <p>use the query tool to fetch data</p>
              </div>
            </Link>
          </div>
          <div className="card flex-1 bg-base-100 shadow-xl">
            <Link href="/transact">
              <div className="card-body">
                <h2 className="card-title">transact &rarr;</h2>
                <p>test a sample marketplace</p>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
