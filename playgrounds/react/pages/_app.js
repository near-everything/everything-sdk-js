import { EverythingProvider } from "@everything-sdk-js/react";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/globals.css";
import { WalletContextProvider } from "../../../../mintbase-js/packages/react/lib";

function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <UserProvider>
        <WalletContextProvider>
          <EverythingProvider>
            {getLayout(<Component {...pageProps} />)}
          </EverythingProvider>
        </WalletContextProvider>
      </UserProvider>
    </>
  );
}

export default App;
