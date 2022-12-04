import Head from "next/head";
import Layout from "../../components/Layout";
import Form from "../../components/Playground/Form";
import { useEverything } from "@everything-sdk-js/react";

export default function Playground() {
  const { text } = useEverything();
  return (
    <>
      <Head>
        <title>everything playground</title>
        <meta name="description" content="playground for everything sdk js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center h-full w-full">
        <p className="text-4xl m-8">playground</p>
        <p className="text-4xl m-8">{text}</p>
        <Form />
      </main>
    </>
  );
}

Playground.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
