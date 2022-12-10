import { UserProvider } from "@auth0/nextjs-auth0/client";
import { EverythingProvider } from "@everything-sdk-js/react";
import {
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";
import { useState } from "react";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { WalletContextProvider } from "../../../../mintbase-js/packages/react/lib";
import "../styles/globals.css";

if (process.env.NODE_ENV === "development") {
  require("../mocks");
}

function App({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <UserProvider>
        <WalletContextProvider>
          <EverythingProvider>
            <QueryClientProvider client={queryClient}>
              {getLayout(<Component {...pageProps} />)}
            </QueryClientProvider>
          </EverythingProvider>
        </WalletContextProvider>
      </UserProvider>
    </>
  );
}

export default App;
