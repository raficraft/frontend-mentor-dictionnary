import "@/src/styles/globals.scss";
import type { AppProps } from "next/app";
import Template from "../components/templates/template";
import { ThemeProvider } from "../context/useTheme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Template>
        <Component {...pageProps} />
      </Template>
    </ThemeProvider>
  );
}
