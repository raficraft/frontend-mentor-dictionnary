import { useState } from "react";

const formValidity = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "tooLong",
  "tooShort",
  "rangeOverflow",
  "rangeUnderflow",
  "stepMismatch",
  "badInput",
  "customError",
  "valid",
] as const;

type FormErrors = { [key: string]: string };

type FieldErrorMessages = {
  valueMissing?: string;
  typeMismatch?: string;
  patternMismatch?: string;
  tooLong?: string;
  tooShort?: string;
  rangeOverflow?: string;
  rangeUnderflow?: string;
  stepMismatch?: string;
  badInput?: string;
  customError?: string;
  valid?: string;
};

type FormElementType =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;

type Fields = {
  [key: string]: FieldErrorMessages;
};

type UseFormOptions = {
  fields: Fields;
};

type UseFormReturn = {
  validForm: (event: React.FormEvent<HTMLFormElement>) => boolean;
  validField: <T extends FormElementType>(event: React.FormEvent<T>) => void;
  errors: FormErrors;
};

const useForm = ({ fields }: UseFormOptions): UseFormReturn => {
  const [errors, setErrors] = useState<FormErrors>({});

  const validForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const elements = form.elements;
    const formErrors: FormErrors = {};

    for (let i = 0; i < elements.length; i++) {
      const element = elements[i] as FormElementType;
      const name = element.name;

      if (element.tagName !== "BUTTON" && !element.checkValidity()) {
        const errorMessage = getErrorMessage(fields, element);
        formErrors[name] = errorMessage || element.validationMessage;
      }
    }

    if (Object.entries(formErrors).length > 0) {
      setErrors(formErrors);
      return false;
    } else {
      setErrors({});
      return true;
    }
  };

  const validField = <T extends FormElementType>(event: React.FormEvent<T>) => {
    const element = event.currentTarget;
    const name = element.name;
    if (element.checkValidity()) {
      setErrors((prevErrors) => {
        const { [name]: _, ...rest } = prevErrors;
        return rest;
      });
      return true;
    } else {
      const errorMessage = getErrorMessage(fields, element);
      setErrors({
        ...errors,
        [name]: errorMessage || element.validationMessage,
      });
      return false;
    }
  };

  const getErrorMessage = <T extends FormElementType>(
    fields: Fields,
    element: T
  ): string | undefined => {
    const name = element.name;

    if (!fields[name]) {
      return undefined;
    }

    for (const key of formValidity) {
      if (
        fields[name] &&
        fields[name].hasOwnProperty(key) &&
        (element as HTMLInputElement).validity[key]
      ) {
        return fields[name][key];
      }
    }

    return undefined;
  };

  return {
    validForm,
    errors,
    validField,
  };
};

export default useForm;
