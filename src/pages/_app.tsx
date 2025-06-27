import "@/styles/globals.css";
import type { AppProps } from "next/app";

import CartWidget from "@/components/CartWidget";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <CartWidget />
      <Component {...pageProps} />
    </>
  );
}
