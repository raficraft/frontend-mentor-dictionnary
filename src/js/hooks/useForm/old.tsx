import { useState } from "react";
import {
  FieldErrorMessages,
  FormElementType,
  FormErrors,
  FormValidity,
  UseFormOptions,
  UseFormReturn,
} from "./types";

const useForm = ({
  fields = {},
  local = "it",
}: UseFormOptions): UseFormReturn => {
  const [errors, setErrors] = useState<FormErrors>({});

  /**
   * Récupère tous les éléments du formulaire sous forme d'un tableau
   * @param event - L'événement de formulaire généré par React
   * @returns un tableau d'éléments du formulaire
   */
  const getFormElements = (
    event: React.FormEvent<HTMLFormElement>
  ): FormElementType[] => {
    const form = event.currentTarget;
    return Array.from(form.elements) as FormElementType[];
  };

  /**
   * Récupère les données du formulaire
   * @param event - L'événement de formulaire généré par React
   * @returns un objet contenant les données du formulaire sous forme de paires clé-valeur
   */
  const getFormData = (event: React.FormEvent<HTMLFormElement>) => {
    const elements = getFormElements(event);
    const formData: any = [];

    // Parcourt chaque élément du formulaire pour construire l'objet formData
    elements.forEach((element) => {
      const name = element.name;
      formData[name] = element.value;
    });

    return formData;
  };

  /**
   * Vérifie si le champ est valide selon les règles de validation
   * définies dans `field`.
   *
   * @param field Les règles de validation à appliquer sur `element`.
   * @param element L'élément du formulaire à valider.
   * @returns Un message d'erreur si le champ n'est pas valide, null sinon.
   */
  const checkValidateField = (
    field: FieldErrorMessages,
    element: FormElementType
  ): string | null => {
    if (field.custom && field.custom.customValidation) {
      // Si une validation personnalisée a été définie, on l'utilise
      const customValidation = field.custom.customValidation;
      const isValid = customValidation(element.value);
      return !isValid ? getMessage(field.custom.message) : null;
    } else if (!element.checkValidity()) {
      // Sinon on utilise les règles de validation HTML5 par défaut
      const error =
        getErrorMessage(field, element) || element.validationMessage!;
      return getMessage(error);
    }
    // Si le champ est valide, on retourne null
    return null;
  };

  /**
   * Récupère le message d'erreur à afficher pour une validation donnée.
   *
   * @param message Le message d'erreur ou un objet contenant les messages pour chaque langue.
   * @returns Le message d'erreur approprié pour la langue courante.
   * @throws Une erreur si le message pour la langue courante n'a pas été trouvé.
   */
  const getMessage = (message: string | Record<string, string>): string => {
    if (typeof message === "string") {
      // Si le message est une chaîne de caractères, on la retourne telle quelle
      return message;
    } else if (typeof message === "object" && message[local]) {
      // Sinon, si le message est un objet et qu'il contient un message pour la langue courante, on le retourne
      return message[local];
    } else {
      // Si le message n'a pas été trouvé pour la langue courante, on lève une erreur
      throw new Error(`Message not found for local "${local}"`);
    }
  };

  const validateForm = (event: React.FormEvent<HTMLFormElement>): boolean => {
    event.preventDefault();
    const elements = getFormElements(event);
    const formErrors: FormErrors = {};
    const validFields: string[] = [];

    for (const element of elements) {
      if (element.tagName === "BUTTON" || element.disabled) continue;
      const name = element.name;
      const field = fields[name];
      if (!field) continue; // On ignore les champs qui ne sont pas définis
      const errorMessage = checkValidateField(field, element);
      if (errorMessage) {
        formErrors[name] = errorMessage;
      } else {
        validFields.push(name);
      }
    }

    // On parcourt le tableau des champs valides et on supprime les erreurs de ces champs s'ils existent
    for (const name of validFields) {
      if (formErrors[name]) {
        delete formErrors[name];
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

  const validateField = (event: React.FormEvent<FormElementType>): void => {
    const element = event.target as FormElementType;
    const name = element.name!;
    const field = fields[name] ?? {};

    const errorMessage = checkValidateField(field, element);

    setErrors((prevErrors) => {
      if (errorMessage) {
        return {
          ...prevErrors,
          [name]: errorMessage,
        };
      } else {
        const { [name]: _, ...rest } = prevErrors;
        return rest;
      }
    });
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
        const errorMessage = field[key]?.message || element.validationMessage;
        const callback = field[key]?.callback;
        if (callback) callback();
        return errorMessage;
      }
    }

    return element.validationMessage;
  };

  const reset = () => {
    setErrors({});
  };

  return {
    validateForm,
    validateField,
    getFormData,
    reset,
    errors,
  };
};

export default useForm;
