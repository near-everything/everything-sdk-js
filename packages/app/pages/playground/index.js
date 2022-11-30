import Head from "next/head";
import Dropzone from "react-dropzone";
import styles from "../../styles/Home.module.css";
import { create } from "@everything-sdk-js/sdk";
import { useState } from "react";

export default function Playground() {
  const [files, setFiles] = useState([]);
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("attribute1", "option243");
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    await create(formData);
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>everything playground</title>
        <meta name="description" content="playground for everything sdk js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Playground</h1>

        <p className={styles.description}>create custom templates</p>

        <div>
          <div className="bg-gray-600 p-8">
            <Dropzone
              onDrop={(acceptedFiles) => setFiles(...files, acceptedFiles)}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag and drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <br />
          <button className="btn" onClick={handleSubmit}>
            submit
          </button>
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
