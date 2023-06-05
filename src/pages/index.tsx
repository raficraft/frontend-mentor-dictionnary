import Head from "next/head";
import React, { useState } from "react";
import { Inter } from "next/font/google";
import { Text, AudioPlayer } from "@/atoms/index";
import { SearchWord } from "@/organisms/index";
import styles from "@/styles/pages/Home.module.scss";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [result, setResult] = useState<any | undefined>([]);
  const [error, setError] = useState<string>("");

  const fetchData = async (word: string) => {
    try {
      const response = await fetch(`/api/dictionary?word=${word}`);
      const data: any = await response.json();
      if (data.error) {
        throw new Error("No Definitions found");
      } else {
        setResult(data[0]);
        setError("");
      }
    } catch (error: any) {
      setError(error.toString());
    }
  };

  const getAudio = () => {
    if (result.phonetics.length === 0) {
      return <AudioPlayer src={null} />;
    } else {
      const valuesArray = Object.values(result.phonetics);
      const src: any = valuesArray[valuesArray.length - 1] as string;
      return <AudioPlayer src={src.audio} />;
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
        {error && <p>{error}</p>}
        {result.word ? (
          <>
            <header className={styles.main_header}>
              <div className={styles.title}>
                <Text tag="h1" className="text_xl">
                  {result.word}
                </Text>
                <Text tag="p" className="text_lg text_accent">
                  {result.phonetic}
                </Text>
              </div>
              <div>{getAudio()}</div>
            </header>
            {Object.keys(result.meanings).map((_, key) => {
              return (
                <section key={`meaning-${key}`} className={styles.meanings}>
                  <header className={styles.separator}>
                    <Text tag="h2" className="bold text_lg italic">
                      {result.meanings[key].partOfSpeech}
                    </Text>
                  </header>
                  <article>
                    <Text className="text_gray">Meaning</Text>
                    <ul className={styles.list}>
                      {Object.keys(result.meanings[key].definitions).map(
                        (_, keys) => {
                          return (
                            <li key={`definition-${keys}`}>
                              {
                                result.meanings[key].definitions[keys]
                                  .definition
                              }
                            </li>
                          );
                        }
                      )}
                    </ul>
                  </article>
                  <footer className={styles.footer}>
                    <Text>Synonyms</Text>
                    <Text className="text_accent bold">
                      {result.meanings[key].synonyms[0]}
                    </Text>
                  </footer>
                </section>
              );
            })}
            <footer>
              <p>Source {result.sourceUrls}</p>
            </footer>
          </>
        ) : null}
      </main>
    </>
  );
}
