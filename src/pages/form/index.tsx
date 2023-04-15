import Head from "next/head";
import { Inter } from "next/font/google";
import { useRef } from "react";
import Field from "@/src/components/molecules/Field/Field";
import useForm from "@/src/js/hooks/useForm/useForm";

const inter = Inter({ subsets: ["latin"] });

export default function Form() {
  const formRef = useRef(null);
  const { handleSubmit, errors } = useForm();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit(event);
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
          maxLength={32}
          required
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
          maxLength={32}
          required
          errorMessage={errors.adresse}
        >
          <label htmlFor="adresse">adresse</label>
        </Field>
        <button type="submit">Valider</button>
      </form>
    </>
  );
}
