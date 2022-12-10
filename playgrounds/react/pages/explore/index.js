import { thingById } from "@everything-sdk-js/data";
import { useQuery } from "@tanstack/react-query";
import Head from "next/head";
import Layout from "../../components/Layout";

export default function Explore() {
  const { data, isLoading, isError, error } = useQuery(
    ["thingById", 1],
    async () => {
      const { data } = await thingById(1);
      return data;
    }
  );

  return (
    <>
      <Head>
        <title>everything explore</title>
        <meta name="description" content="explore for everything sdk js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center h-full w-full">
        <p className="text-4xl m-8">explore</p>
        <div className="text-white text-center">
          <p>{isLoading}</p>
          <p>{isError}</p>
          <p>{isError && JSON.stringify(error)}</p>
          <p>{!isLoading && !isError && JSON.stringify(data)}</p>
        </div>
      </main>
    </>
  );
}

Explore.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
