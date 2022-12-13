import { useUser } from "@auth0/nextjs-auth0/client";
import "@near-wallet-selector/modal-ui/styles.css";
import Head from "next/head";
import Link from "next/link";
import { useWallet } from "@mintbase-js/react";
import Layout from "../components/Layout";

export default function Home() {
  const { connect, disconnect, activeAccountId, isWalletSelectorSetup } =
    useWallet();
  const { user, isLoading } = useUser();

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
                <div>
                  {isLoading ? null : (
                    <>
                      {user ? (
                        <>
                          <p className="mb-2">
                            you are logged in as {user.nickname}
                          </p>
                          <a href="/api/auth/logout">
                            <button className="btn normal-case">
                              disconnect
                            </button>
                          </a>
                        </>
                      ) : (
                        <>
                          <p className="mb-2">you are not logged in</p>
                          <a href="/api/auth/login">
                            <button className="btn normal-case">connect</button>
                          </a>
                        </>
                      )}
                    </>
                  )}
                </div>
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
        <div className="flex grid-cols-2 gap-4 w-3/4 justify-center">
          <div className="card flex-1 bg-base-100 shadow-xl">
            <Link href="/playground">
              <div className="card-body">
                <h2 className="card-title">playground &rarr;</h2>
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
        </div>
      </main>
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
