import Head from "next/head";
import { Inter } from "next/font/google";
import Field from "@/src/components/molecules/Field/Field";
import useForm from "@/src/js/hooks/useForm/useForm";

const inter = Inter({ subsets: ["latin"] });

export default function Form() {
  const { validateForm, validateField, errors, getData, reset } = useForm({
    fields: {
      password: {
        minLength: {
          value: 3,
          message: "short",
        },
      },
    },
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateForm(event)) {
      const data = getData(event);
      console.log(data);
    }
  };

  return (
    <>
      <Head>
        <title>Test de formulaire</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <form onSubmit={onSubmit} noValidate>
        <Field
          name="email"
          type="email"
          minLength={7}
          maxLength={32}
          errorMessage={errors.email}
        >
          <label htmlFor="email">Email</label>
        </Field>
        <Field
          name="password"
          type="password"
          minLength={7}
          maxLength={32}
          required
          errorMessage={errors.password}
        >
          <label htmlFor="password">Password</label>
        </Field>
        <Field
          name="adresse"
          type="text"
          minLength={7}
          maxLength={32}
          required
          errorMessage={errors.adresse}
        >
          <label htmlFor="adresse">adresse</label>
        </Field>
        <button type="submit">Valider</button>
        <button type="reset" onClick={reset}>
          Reset
        </button>
      </form>
    </>
  );
}
