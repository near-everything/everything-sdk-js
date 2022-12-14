import Head from "next/head";
import { useEffect, useState } from "react";
import Request, { options } from "../../components/Explore/Request";
import Response from "../../components/Explore/Response";
import Layout from "../../components/Layout";

export default function Explore() {
  const [query, setQuery] = useState(0);
  const [param, setParam] = useState("");
  const [data, setData] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setData("");
    setError("");
  }, [query]);

  const runQuery = async () => {
    const { data, error } = await options[query].fn(param);
    setData(data);
    setError(error);
  };

  return (
    <>
      <Head>
        <title>everything explore</title>
        <meta name="description" content="explore for everything sdk js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center h-full w-full">
        <p className="text-4xl m-8">explore</p>
        <div className="w-1/2">
          <Request
            query={query}
            setQuery={setQuery}
            param={param}
            setParam={setParam}
            runQuery={runQuery}
          />
          <br />
          <div className="h-96">
            <Response data={data} error={error} />
          </div>
        </div>
      </main>
    </>
  );
}

Explore.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
