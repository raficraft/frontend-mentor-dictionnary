import Input from "@/atoms/form/input/Input";
import styles from "./GetWord.module.scss";
import { IconMagnify } from "@/src/assets/svg/icons";
import { useRef, FormEvent, useEffect, useState } from "react";
import Error from "@/atoms/form/Error/Error";
interface SearchWordProps {
  setData: (data: any) => void; // ajouter le type de données correspondant aux données récupérées
}

const GetWord: React.FC<SearchWordProps> = ({ setData }) => {
  const [error, setError] = useState<string>("error");
  const inputRef = useRef<HTMLInputElement>(null);

  //TODO : ecrire un services et la requête dans le dossier api
  const fetchData = async (word: string) => {
    const res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const json = await res.json();
    setData(json[0]);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity()) {
      // Ajoutez ici le code pour soumettre le formulaire
      inputRef.current && fetchData(inputRef.current.value);
    } else {
      setError(inputRef.current?.validationMessage || "");
    }
  };

  // const errorMessages = {
  //   valueMissing: "Le champ est obligatoire",
  //   tooShort: "Le doit contenir au moins 2 caractères",
  //   patterMisMatch: "",
  // };

  useEffect(() => {
    document.documentElement.lang = "en";
    inputRef.current?.focus();
  }, []);

  return (
    <div className={styles.searchWord}>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.bloc}>
          <div className={styles.blocInput}>
            <Input
              type="search"
              placeholder="Search a word"
              inputRef={inputRef}
              minLength={2}
              maxLength={32}
              pattern="[a-zA-Z]+"
              required
            />
            <span className={styles.svg}>
              <IconMagnify />
            </span>
          </div>
          <Error message={error} />
        </div>
      </form>
    </div>
  );
};

export default GetWord;
