import Head from "next/head";
import { useState } from "react";
import Collapse from "../../components/Collapse";
import Layout from "../../components/Layout";
import CreateMedia from "../../components/Playground/CreateMedia";
import CreateThing from "../../components/Playground/CreateThing";
import MintThing from "../../components/Playground/MintThing";

export default function Playground() {
  const [showCreateThing, setShowCreateThing] = useState(true);
  const [showCreateMedia, setShowCreateMedia] = useState(true);
  const [showMintThing, setShowMintThing] = useState(true);
  const [defaultThingId, setDefaultThingId] = useState("");

  return (
    <>
      <Head>
        <title>everything playground</title>
        <meta name="description" content="playground for everything sdk js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center h-full w-full">
        <p className="text-4xl m-8">playground</p>
        <div className="flex flex-col gap-4 w-3/4">
          <Collapse
            tabIndex={0}
            title={"create thing"}
            checked={showCreateThing}
            setChecked={setShowCreateThing}
          >
            <CreateThing setDefaultThingId={setDefaultThingId} />
          </Collapse>
          <Collapse
            tabIndex={1}
            title={"create media"}
            checked={showCreateMedia}
            setChecked={setShowCreateMedia}
          >
            <CreateMedia defaultThingId={defaultThingId} />
          </Collapse>
          <Collapse
            tabIndex={2}
            title={"mint thing"}
            checked={showMintThing}
            setChecked={setShowMintThing}
          >
            <MintThing defaultThingId={defaultThingId} />
          </Collapse>
        </div>
      </main>
    </>
  );
}

Playground.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
