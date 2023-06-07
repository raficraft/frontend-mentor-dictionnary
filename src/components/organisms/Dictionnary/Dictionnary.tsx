import { Text, AudioPlayer } from "@/atoms/index";
import styles from "./Dictionnary.module.scss";
import DictionaryApiResult from "@/src/pages/api/types";

interface DictionnaryProps {
  dictionnary: DictionaryApiResult;
}

function Dictionnary({ dictionnary }: DictionnaryProps) {
  const getAudio = () => {
    if (dictionnary.phonetics.length === 0) {
      return <AudioPlayer src={null} />;
    } else {
      const valuesArray = Object.values(dictionnary.phonetics);
      const src = valuesArray[valuesArray.length - 1].audio;
      return <AudioPlayer src={src} />;
    }
  };

  return (
    <>
      <header className={styles.main_header}>
        <div className={styles.title}>
          <Text tag="h1" className="text_xl">
            {dictionnary.word}
          </Text>
          <Text tag="p" className="text_lg text_accent">
            {dictionnary.phonetic}
          </Text>
        </div>
        <div>{getAudio()}</div>
        {Object.keys(dictionnary.meanings).map((_, key) => {
          return (
            <section key={`meaning-${key}`} className={styles.meanings}>
              <header className={styles.separator}>
                <Text tag="h2" className="bold text_lg italic">
                  {dictionnary.meanings[key].partOfSpeech}
                </Text>
              </header>
              <article>
                <Text className="text_gray">Meaning</Text>
                <ul className={styles.list}>
                  {Object.keys(dictionnary.meanings[key].definitions).map(
                    (_, keys) => {
                      return (
                        <li key={`definition-${keys}`}>
                          {
                            dictionnary.meanings[key].definitions[keys]
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
                  {dictionnary.meanings[key].synonyms[0]}
                </Text>
              </footer>
            </section>
          );
        })}
        <footer>
          <p>Source {dictionnary.sourceUrls}</p>
        </footer>
      </header>
    </>
  );
}

export default Dictionnary;
