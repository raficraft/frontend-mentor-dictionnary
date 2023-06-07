import Head from "next/head";
import React, { useState } from "react";
import { Inter } from "next/font/google";
import { Dictionnary, ErrorApi, SearchWord } from "@/organisms/index";
import styles from "@/styles/pages/Home.module.scss";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [result, setResult] = useState<any | undefined>([]);
  const [error, setError] = useState<boolean>(false);

  const fetchData = async (word: string) => {
    console.log("word on page", word);

    try {
      const response = await fetch(`/api/dictionary?word=${word}`);
      const data: any = await response.json();
      if (data.error) {
        throw new Error("No Definitions found");
      } else {
        setResult(data[0]);
        setError(false);
      }
    } catch (error: any) {
      setError(true);
    }
  };

  return (
    <>
      <Head>
        <title>Dictionnary API</title>
        <meta name="description" content="Dictionnary API" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SearchWord callApi={fetchData} />
      <main className={styles.main}>
        {error && <ErrorApi />}
        {result.word && !error ? <Dictionnary dictionnary={result} /> : null}
      </main>
    </>
  );
}
