import { thingById } from "@everything-sdk-js/data";
import Head from "next/head";
import { useState } from "react";
import Layout from "../../components/Layout";

const options = [
  "things",
  "thingById",
  "thingsByOwner",
  "attributes",
  "attributeById",
];

export default function Explore() {
  const [query, setQuery] = useState(options[0]);
  const [param, setParam] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const runQuery = async () => {
    const { data, error } = await thingById(param);
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
          <div className="flex w-full justify-between">
            <div>
              <select
                className="select w-full max-w-xs"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setParam("");
                }}
              >
                {options.map((it, index) => (
                  <option key={index}>{it}</option>
                ))}
              </select>
            </div>
            {query !== "things" && query !== "attributes" ? (
              <div>
                <input
                  type="text"
                  placeholder={"enter parameter"}
                  value={param}
                  onChange={(e) => setParam(e.target.value)}
                  className="input w-full max-w-xs"
                />
              </div>
            ) : null}
            <button className={"btn normal-case"} onClick={runQuery}>
              run query
            </button>
          </div>
          <br />
          <div>
            <p className="pb-1">response:</p>
            <textarea
              className="textarea h-96 w-full"
              disabled
              value={
                (data && JSON.stringify(data, null, 2)) ||
                (error && JSON.stringify(error, null, 2))
              }
            />
          </div>
        </div>
      </main>
    </>
  );
}

Explore.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
