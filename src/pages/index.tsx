import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import { Inter } from "next/font/google";
import { Dictionnary, ErrorApi, SearchWord } from "@organisms/index";
import { useDictionarySearch } from "@hooks/index";
import { Loading } from "@atoms/index";
import styles from "@styles/pages/Home.module.scss";
import { SwitchTransition, CSSTransition } from "react-transition-group";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { result, error, fetchData, loading } = useDictionarySearch();
  const [isEmptyField, setIsEmptyField] = useState(false);
  const mainRef = useRef(null);

  useEffect(() => {
    if (!result) {
      setIsEmptyField(true);
    } else {
      setIsEmptyField(false);
    }
  }, [result]);

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
        {loading && <Loading />}
        {error?.message === "No Definitions found" &&
          !isEmptyField &&
          !loading && <ErrorApi />}
        {result && !error && !isEmptyField && !loading && (
          <Dictionnary dictionnary={result} />
        )}
      </main>
    </>
  );
}
