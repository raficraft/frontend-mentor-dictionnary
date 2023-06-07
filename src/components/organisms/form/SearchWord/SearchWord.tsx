import styles from "./SearchWord.module.scss";
import { IconMagnify } from "@/src/assets/svg/icons";
import { FormEvent } from "react";
import { Field } from "@/molecules/index";
import { useForm } from "@/hooks/index";
import { debounce } from "@/utils/debounce/debounce";

interface SearchWordProps {
  callApi: (data: string) => void;
}

const SearchWord: React.FC<SearchWordProps> = ({ callApi }) => {
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
    event.preventDefault();
    if (validateForm(event)) {
      const dataForm = getFormData(event);
      console.log(dataForm);
      callApi(dataForm.search);
    } else {
      console.log("sub failed", errors);
    }
  };

  const handleChange = debounce((event) => {
    event.preventDefault();
    const searchValue = event.target.value;
    if (validateField(event)) {
      callApi(searchValue);
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
          minLength={2}
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
