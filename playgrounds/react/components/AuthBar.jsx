import { useUser } from "@auth0/nextjs-auth0/client";
import { useWallet } from "@mintbase-js/react";
import Link from "next/link";
import Image from "next/image";

function AuthBar() {
  const { connect, disconnect, activeAccountId } =
    useWallet();
  const { user } = useUser();

  const renderConnectEverything = () => {
    return <Link href="/api/auth/login">connect</Link>;
  };

  const renderDisconnectEverything = () => {
    return <Link href="/api/auth/logout">disconnect</Link>;
  };

  const renderConnectNEAR = () => {
    return <div onClick={connect}>connect</div>;
  };

  const renderDisconnectNEAR = () => {
    return <div onClick={disconnect}>disconnect</div>;
  };

  return (
    <div className="flex flex-row">
      <div className="flex h-16">
        <AuthIcon
          src="/assets/everything.png"
          alt={"everything"}
          authObject={user}
          username={user?.nickname}
          renderConnect={renderConnectEverything}
          renderDisconnect={renderDisconnectEverything}
        />
        <AuthIcon
          src="/assets/near_logo_stack_wht.png"
          alt={"NEAR"}
          authObject={activeAccountId}
          username={activeAccountId}
          renderConnect={renderConnectNEAR}
          renderDisconnect={renderDisconnectNEAR}
        />
      </div>
    </div>
  );
}

function AuthIcon({
  src,
  alt,
  authObject,
  username,
  renderConnect,
  renderDisconnect,
}) {
  return (
    <div className="dropdown">
      <label tabIndex={0} className="btn m-1 align-middle gap-2">
        <div>
          <Image src={src} width="32" height="32" alt={alt} />
        </div>
        {authObject ? <p className="mb-2">{username}</p> : renderConnect()}
      </label>
      {authObject ? (
        <ul
          tabIndex={0}
          className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>{renderDisconnect()}</li>
        </ul>
      ) : null}
    </div>
  );
}

export default AuthBar;
