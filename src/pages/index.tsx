import Head from 'next/head';
import { Dictionnary, ErrorApi, SearchWord } from '@organisms/index';
import styles from '@styles/pages/Home.module.scss';
import type { InferGetStaticPropsType, GetStaticProps } from 'next';
import useApiStore from '@store/useDictionaryAPI/useDictionaryApi';
import DictionaryApiResult from '@api/types';

export default function Home({
  dico,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { result, error, loading } = useApiStore();

  return (
    <>
      <Head>
        <title>Dictionnary API</title>
        <meta name='description' content='Dictionnary API' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <SearchWord />

      <main className={styles.main}>
        {error?.message === 'No Definitions found' && !loading ? (
          <ErrorApi />
        ) : (
          !error &&
          !loading &&
          (result || dico) && (
            <Dictionnary dictionnary={result || dico[0] || []} />
          )
        )}
      </main>
    </>
  );
}

export async function loadDico(): Promise<DictionaryApiResult[]> {
  const url = process.env.DICTIONARY_API_URL;
  const res = await fetch(`${url}dictionary`);
  const dico = await res.json();
  return dico;
}

export const getStaticProps: GetStaticProps<{
  dico: DictionaryApiResult[];
}> = async () => {
  const dico = await loadDico();
  return { props: { dico } };
};
