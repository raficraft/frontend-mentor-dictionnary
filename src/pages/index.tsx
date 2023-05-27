import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import SearchWord from "@/components/organisms/form/SearchWord/SearchWord";
import AudioPlayer from "@/components/atoms/AudioPlayer/AudioPlayer";
import styles from "../styles/pages/Home.module.scss";

const inter = Inter({ subsets: ["latin"] });

console.log(inter);

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

  useEffect(() => {
    console.log(result);
  }, [result]);
  return (
    <>
      <Head>
        <title>Dictionnary API</title>
        <meta name="description" content="Dictionnary API" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <HomePage /> */}
      <SearchWord callApi={fetchData} />
      <main className={styles.main}>
        {error && <p>{error}</p>}
        {result.word ? (
          <>
            <header>
              <div className={styles.title}>
                <h1 className="font_xl">{result.word}</h1>
                <p className="font_lg text_accent">{result.phonetic}</p>
              </div>
              <div>{getAudio()}</div>
            </header>
            {Object.keys(result.meanings).map((_, key) => {
              return (
                <React.Fragment key={`meaning-${key}`}>
                  <div className={styles.separator}>
                    <p className="bold font_lg italic">
                      {result.meanings[key].partOfSpeech}
                    </p>
                  </div>
                  <section className={styles.meanings}>
                    <h3
                      className="text_gray"
                      style={{
                        fontWeight: "lighter",
                      }}
                    >
                      Meaning
                    </h3>
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
                    <span className={styles.footer}>
                      <p>Synonyms</p>
                      <p className="text_accent bold">
                        {result.meanings[key].synonyms[0]}
                      </p>
                    </span>
                  </section>
                </React.Fragment>
              );
            })}
          </>
        ) : null}
      </main>
    </>
  );
}
