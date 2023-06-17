import Head from "next/head";
import { Dictionnary, ErrorApi, SearchWord } from "@organisms/index";
import { Loading } from "@atoms/index";
import styles from "@styles/pages/Home.module.scss";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import useApiStore from "src/store/useDictionaryAPI/useDictionaryApi";

export default function Home({
  dico,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { result, error, loading } = useApiStore();

  return (
    <>
      <Head>
        <title>Dictionnary API</title>
        <meta name="description" content="Dictionnary API" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SearchWord />

      <main className={styles.main}>
        {loading && <Loading />}
        {error?.message === "No Definitions found" && !loading && <ErrorApi />}
        {(result || dico) && !error && !loading && (
          <Dictionnary dictionnary={result || dico[0] || []} />
        )}
      </main>
    </>
  );
}

async function loadDico() {
  const url = process.env.DICTIONARY_API_URL;
  const res = await fetch(`${url}dictionary`);
  const dico = await res.json();
  return dico;
}

export const getStaticProps: GetStaticProps<{
  dico: any;
}> = async () => {
  const dico = await loadDico();
  return { props: { dico } };
};
