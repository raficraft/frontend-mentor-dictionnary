import { useState } from "react";

interface FormErrors {
  [key: string]: string;
}

interface UseFormReturn {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  errors: FormErrors;
}

const useForm = (): UseFormReturn => {
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = form.elements;
    const formErrors: FormErrors = {};

    for (let i = 0; i < fields.length; i++) {
      const field = fields[i] as HTMLInputElement;
      if (field.tagName !== "BUTTON" && !field.checkValidity()) {
        formErrors[field.name] = field.validationMessage;
      }
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setErrors({});
      console.log("valid");
      // Ajoutez ici le code pour soumettre le formulaire
    }
  };

  return { handleSubmit, errors };
};

export default useForm;
