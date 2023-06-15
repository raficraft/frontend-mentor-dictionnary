import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Dictionnary, ErrorApi, SearchWord } from "@organisms/index";
import { useDictionarySearch } from "@hooks/index";
import { Loading } from "@atoms/index";
import styles from "@styles/pages/Home.module.scss";
import type { InferGetStaticPropsType, GetStaticProps } from "next";

export default function Home({
  dico,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { result, error, fetchData, loading } = useDictionarySearch(dico);
  const [isEmptyField, setIsEmptyField] = useState(false);

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
          <Dictionnary dictionnary={result || dico || []} />
        )}
      </main>
    </>
  );
}

async function loadDico() {
  const res = await fetch(
    "https://api.dictionaryapi.dev/api/v2/entries/en/dictionary"
  );
  const dico = await res.json();
  return dico;
}

export const getStaticProps: GetStaticProps<{
  dico: any;
}> = async () => {
  const dico = await loadDico();
  return { props: { dico } };
};
