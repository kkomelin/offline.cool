import type { AppProps } from "next/app";
import Script from "next/script";
import "~~/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />{" "}
      <Script
        defer
        src="https://cloud.umami.is/script.js"
        data-website-id="b08ba708-7ba4-4334-9e7d-82f7ba9d3d1d"
      />
    </>
  );
}
