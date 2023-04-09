import Input from "@/atoms/form/input/Input";
import styles from "./SearchWord.module.scss";
import { IconMagnify } from "@/src/assets/svg/icons";
import { useRef, FormEvent, useEffect, useState } from "react";
import Error from "@/atoms/form/Error/Error";

const SearchWord: React.FC = () => {
  const [error, setError] = useState<string>("error");
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const form = e.currentTarget;
    console.log(form.elements);
    console.log(form.checkValidity());
    console.log(inputRef.current?.dataset.valueMissing);
    console.log(inputRef.current?.validity.patternMismatch);
    if (form.checkValidity()) {
      console.log("Submitting form");
      // Ajoutez ici le code pour soumettre le formulaire
    } else {
      setError(inputRef.current?.validationMessage || "");
    }
  };

  const errorMessages = {
    valueMissing: "Le champ est obligatoire",
    tooShort: "Le doit contenir au moins 2 caractères",
    patterMisMatch: "",
  };

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

export default SearchWord;
