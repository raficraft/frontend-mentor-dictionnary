import { useState } from "react";
import {
  FieldErrorMessages,
  FormElementType,
  FormErrors,
  FormValidity,
  UseFormOptions,
  UseFormReturn,
} from "./types";

const useForm = ({ fields }: UseFormOptions): UseFormReturn => {
  const [errors, setErrors] = useState<FormErrors>({});

  const getFormElements = (
    event: React.FormEvent<HTMLFormElement>
  ): FormElementType[] => {
    const form = event.currentTarget;
    return Array.from(form.elements) as FormElementType[];
  };

  const getData = (event: React.FormEvent<HTMLFormElement>) => {
    const elements = getFormElements(event);
    const formData: any = [];
    elements.forEach((element) => {
      const name = element.name!;
      formData[name] = element.value;
    });
    return formData;
  };

  const validateForm = (event: React.FormEvent<HTMLFormElement>): boolean => {
    event.preventDefault();
    const elements = getFormElements(event);
    const formErrors: FormErrors = {};
    for (const element of elements) {
      if (element.tagName === "BUTTON") continue;
      if (!element.checkValidity()) {
        const name = element.name!;
        const errorMessage = getErrorMessage(fields[name], element);
        formErrors[name] = errorMessage || element.validationMessage!;
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

  const validateField = <T extends FormElementType>(
    event: React.FormEvent<T>,
    showError = true
  ): boolean => {
    const element = event.currentTarget;
    const name = element.name!;
    const isValid = element.checkValidity();

    if (isValid) {
      setErrors((prevErrors) => {
        const { [name]: _, ...rest } = prevErrors;
        return rest;
      });
    } else if (showError) {
      const errorMessage = getErrorMessage(fields[name], element);
      setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
    }

    return isValid;
  };

  const getErrorMessage = <T extends FormElementType>(
    field: FieldErrorMessages = {},
    element: T
  ): string | undefined => {
    const validityKeys = Object.keys(field) as FormValidity[];

    for (const key of validityKeys) {
      let validityLabel;

      switch (key) {
        case "required":
          validityLabel = "valueMissing";
          break;
        case "pattern":
          validityLabel = "patternMismatch";
          break;
        case "maxLength":
          validityLabel = "tooLong";
          break;
        case "minLength":
          validityLabel = "tooShort";
          break;
        case "min":
          validityLabel = "rangeUnderflow";
          break;
        case "max":
          validityLabel = "rangeOverflow";
          break;
        case "step":
          validityLabel = "stepMismatch";
          break;
        default:
          validityLabel = key;
      }

      if (element.validity[validityLabel as keyof ValidityState]) {
        const errorMessage = field[key]?.message;
        const callback = field[key]?.callback;
        if (callback) callback();
        return errorMessage;
      }
    }

    return undefined;
  };

  const reset = () => {
    setErrors({});
  };

  return {
    validateForm,
    validateField,
    getData,
    reset,
    errors,
  };
};

export default useForm;
