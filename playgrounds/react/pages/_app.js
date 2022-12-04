import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/globals.css";
import { EverythingProvider } from "@everything-sdk-js/react";

function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return <><EverythingProvider>{getLayout(<Component {...pageProps} />)}</EverythingProvider></>;
}

export default App;
