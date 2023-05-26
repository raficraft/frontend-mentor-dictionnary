import { useEffect, useState } from "react";
import SearchWord from "@/organisms/form/SearchWord/SearchWord";
import AudioPlayer from "@/atoms/AudioPlayer/AudioPlayer";
import styles from "./Home.module.scss";

const HomePage = () => {
  //TODO renommer le state en result faire un objet {data : [], error = ''} pour gérer les trois cas d'affichage
  const [result, setResult] = useState<any | undefined>(false);

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
      <SearchWord setData={setResult} />
      <main className={styles.main}>
        {result && !result.tiltle ? (
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
                <>
                  <div className={styles.separator}>
                    <p className="bold font_lg italic">
                      {result.meanings[key].partOfSpeech}
                    </p>
                  </div>
                  <section key={`meaning-${key}`} className={styles.meanings}>
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
                </>
              );
            })}
          </>
        ) : (
          <>Oups aucun résultat</>
        )}
      </main>
    </>
  );
};

export default HomePage;
