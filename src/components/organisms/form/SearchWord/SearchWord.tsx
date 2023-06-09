import styles from "./SearchWord.module.scss";
import React, { FormEvent, forwardRef, useEffect, useRef } from "react";
import { IconMagnify } from "@/src/assets/svg/icons";
import { Field } from "@/molecules/index";
import { useForm } from "@/hooks/index";
import { debounce } from "@/utils/debounce/debounce";

interface SearchWordProps {
  callApi: (data: string) => void;
}

const SearchWord: React.ForwardRefRenderFunction<
  HTMLFormElement,
  SearchWordProps
> = ({ callApi }, ref) => {
  const { validateForm, validateField, errors, getFormData } = useForm({
    fields: {
      search: {
        required: {
          message: "Whoops, can’t be empty…",
        },
        pattern: {
          message: "You can only use alphabetic characters",
        },
        minLength: {
          message: "Two characters minimum",
        },
        maxLength: {
          message: "32 character limit reached",
        },
      },
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    const dataForm = getFormData(event);
    event.preventDefault();
    if (validateForm(event)) {
      callApi(dataForm.search);
    } else {
      console.error("submit failed", errors);
      callApi(dataForm.search);
    }
  };

  const handleChange = debounce((event) => {
    event.preventDefault();
    const searchValue = event.target.value;
    if (validateField(event)) {
      callApi(searchValue);
    } else {
      console.error("submit failed", errors);
      callApi(searchValue);
    }
  }, 300);

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate ref={ref}>
      <Field
        type="search"
        placeholder="Search for any word"
        name="search"
        required
        minLength={2}
        maxLength={32}
        pattern="^[a-zA-ZÀ-ÿ ]{2,32}$"
        onChange={handleChange}
        error={errors.search}
        className={`input ${errors.search ? "input_invalid" : ""}`}
        svg={
          <span className={styles.icon}>
            <IconMagnify />
          </span>
        }
      />
    </form>
  );
};

export default forwardRef(SearchWord);
