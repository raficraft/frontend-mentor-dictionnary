import styles from "./SearchWord.module.scss";
import { IconMagnify } from "@/src/assets/svg/icons";
import { useRef, FormEvent, useEffect, useState } from "react";
import Field from "@/src/components/molecules/Field/Field";
import useForm from "@/src/js/hooks/useForm/useForm";
import { debounce } from "@/src/js/utils/debounce/debounce";

interface SearchWordProps {
  callApi: (data: string) => void;
}

const SearchWord: React.FC<SearchWordProps> = ({ callApi }) => {
  const { validateForm, validateField, errors, getFormData } = useForm({
    fields: {
      search: {
        required: {
          message: "Champ requis",
        },
        pattern: {
          message: "Champ requis",
        },
      },
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (validateForm(event)) {
      const dataForm = getFormData(event);
      callApi(dataForm.search);
    } else {
      console.log("sub failed", errors);
    }
  };

  const handleChange = debounce((event) => {
    event.preventDefault();
    if (validateField(event)) {
      const searchValue = event.target.value;
      if (searchValue) {
        callApi(event.target.value);
      }
    }
  }, 300);

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <Field
          type="search"
          placeholder="Search a word"
          name="search"
          required
          minLength={4}
          maxLength={32}
          pattern="^[a-zA-ZÀ-ÿ ]{1,32}$"
          onChange={handleChange}
          error={errors.search}
          svg={
            <span className={styles.icon}>
              <IconMagnify />
            </span>
          }
        />
      </form>
    </div>
  );
};

export default SearchWord;
