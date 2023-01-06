import { useUser } from "@auth0/nextjs-auth0/client";
import { useWallet } from "@mintbase-js/react";
import Link from "next/link";

function AuthBar() {
  const { connect, disconnect, activeAccountId, isWalletSelectorSetup } =
    useWallet();
  const { user, isLoading } = useUser();
  return (
    <div className="flex flex-row">
      <div className="flex flex-1 flex-col text-center">
        <p className="text-xl">everything</p>
        <div>
          {isLoading ? null : (
            <>
              {user ? (
                <>
                  <p className="mb-2">you are logged in as {user.nickname}</p>
                  <Link href="/api/auth/logout">
                    <button className="btn normal-case">disconnect</button>
                  </Link>
                </>
              ) : (
                <>
                  <p className="mb-2">you are not logged in</p>
                  <Link href="/api/auth/login">
                    <button className="btn normal-case">connect</button>
                  </Link>
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
                  <p className="mb-2">you are logged in as {activeAccountId}</p>
                  <button className="btn normal-case" onClick={disconnect}>
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
  );
}

export default AuthBar;
