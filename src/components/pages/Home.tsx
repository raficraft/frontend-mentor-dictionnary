import { useEffect, useState } from "react";
import GetWord from "@/organisms/form/GetWord/GetWord";
import AudioPlayer from "@/atoms/AudioPlayer/AudioPlayer";

// La page contient deux composant qui consomme l'apelle api
// Un composant avec le titre, la phonétique et le player audio du mot recherché

const HomePage = () => {
  const [data, setData] = useState<any | undefined>(false);

  return (
    <>
      <GetWord setData={setData} />
      <main>
        {data ? (
          <>
            <header>
              <div>
                <h1>{data.word}</h1>
                <p>{data.phonetic}</p>
              </div>
              <div>
                <p>Player audio</p>
                {Object.keys(data.phonetics).map((keys) => {
                  console.log(data.phonetics[keys]);
                  if (data.phonetics[keys].audio) {
                    return (
                      <AudioPlayer
                        key={`audio-${keys}`}
                        src={data.phonetics[keys].audio}
                      />
                    );
                  }
                })}
              </div>
            </header>
            <section>
              {Object.keys(data.meanings).map((_, key) => {
                return (
                  <div key={`meaning-${key}`}>
                    <p>{data.meanings[key].partOfSpeech}</p>
                    <h3>Meaning</h3>
                    <ul>
                      {Object.keys(data.meanings[key].definitions).map(
                        (_, keys) => {
                          return (
                            <li key={`definition-${keys}`}>
                              {data.meanings[key].definitions[keys].definition}
                            </li>
                          );
                        }
                      )}
                    </ul>
                    <p>{data.meanings[key].synonyms[0]}</p>
                  </div>
                );
              })}
            </section>
          </>
        ) : null}
      </main>
    </>
  );
};

export default HomePage;
