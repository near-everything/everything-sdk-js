import { testMessage } from "@everything-sdk-js/react";
import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div >
      <Head>
        <title>everything sdk js</title>
        <meta name="description" content="example app for everything sdk js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main >
        <h1 >{testMessage}</h1>

        <p >
          Get started by editing{" "}
          <code >pages/index.js</code>
        </p>

        <div >
          <Link href="/playground" >
            <h2>Playground &rarr;</h2>
            <p>Customize your tempalte</p>
          </Link>
        </div>
      </main>

      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </div>
  );
}
