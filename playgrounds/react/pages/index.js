import { testMessage } from "@everything-sdk-js/react";
import Head from "next/head";
import Link from "next/link";
import { useWallet } from "../../../../mintbase-js/packages/react/lib";
import Layout from "../components/Layout";
import { useUser } from "@auth0/nextjs-auth0/client";
import "@near-wallet-selector/modal-ui/styles.css";

export default function Home() {
  const {
    connect,
    disconnect,
    activeAccountId,
    // isConnected,
    isWaitingForConnection,
    isWalletSelectorSetup,
    signMessage,
  } = useWallet();
  const { user, isLoading } = useUser();

  const signMessageTest = async () => {
    await signMessage({
      message: "hey",
      callbackUrl: `${window.location.origin}/wallet-callback`,
      meta: JSON.stringify({ type: "signature" }),
    });
  };

  return (
    <>
      <Head>
        <title>everything sdk js</title>
        <meta name="description" content="example app for everything sdk js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center h-full w-full">
        <h1>{testMessage}</h1>

        <div className="flex flex-1">
          <Link href="/playground">
            <h2>Playground &rarr;</h2>
            <p>Customize your template</p>
          </Link>
        </div>
        <div className="flex flex-1">
          <Link href="/explore">
            <h2>Explore &rarr;</h2>
            <p>Fetch data</p>
          </Link>
        </div>
        <br />
        <br />
        <br />
        {isWaitingForConnection ? (
          <div>Waiting for a wallet connection...</div>
        ) : null}

        {isWalletSelectorSetup ? (
          <div>
            {activeAccountId ? (
              <div className="">
                <p className="text-white">
                  You are logged in as {activeAccountId}
                </p>
                <button className="btn" onClick={disconnect}>
                  DISCONNECT
                </button>
              </div>
            ) : (
              <div className="">
                <h2>To continue, login with NEAR</h2>
                <button className="btn close-button" onClick={connect}>
                  CONNECT
                </button>
              </div>
            )}
          </div>
        ) : (
          <div>Waiting for wallet selector components...</div>
        )}

        {activeAccountId ? (
          <button className="btn" onClick={signMessageTest}>
            SIGN MESSAGE
          </button>
        ) : null}
        <div className="flex justify-center">
          {isLoading ? null : (
            <>
              {user ? (
                <a href="/api/auth/logout">
                  <button className="btn normal-case">
                    disconnect from everything
                  </button>
                </a>
              ) : (
                <a href="/api/auth/login">
                  <button className="btn normal-case">
                    connect to everything
                  </button>
                </a>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
