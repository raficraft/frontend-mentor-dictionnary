export type FormValidity =
  | "required"
  | "type"
  | "pattern"
  | "maxLength"
  | "minLength"
  | "min"
  | "max"
  | "step"
  | "custom"
  | "valid";

export type FormElementType =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;

export type FieldErrorMessages = Partial<
  Record<
    FormValidity,
    { message: string; callback?: Function; value?: string | RegExp }
  >
>;

export type Fields = Partial<Record<string, FieldErrorMessages>>;

export type FormErrors = Partial<Record<string, string>>;

export type UseFormOptions = {
  fields: Fields;
};

export type UseFormReturn = {
  validateForm: (event: React.FormEvent<HTMLFormElement>) => boolean;
  getData: (event: React.FormEvent<HTMLFormElement>) => void;
  validateField: <T extends FormElementType>(
    event: React.FormEvent<T>,
    showError?: boolean
  ) => boolean;
  errors: FormErrors;
  reset: any;
};
