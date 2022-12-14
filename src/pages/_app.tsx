import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { NextSeo } from "next-seo";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="google-site-verification"
          content="Q_yP03gI2rE6U195WodXLoQ5c7cctUVc_gAL9R92Uto"
        />
      </Head>
      <NextSeo
        title="Twitch Chat Overlay"
        description="Twitch Chat Overlay makes you able to embed your Twitch chat during the broadcast."
        openGraph={{
          url: "https://chat-overlay.vercel.app",
          title: "Twitch Chat Overlay",
          description:
            "Twitch Chat Overlay makes you able to embed your Twitch chat during the broadcast.",
          images: [
            {
              url: "/logo.jpg",
              width: 820,
              height: 309,
              alt: "Twitch Chat Overlay logo",
            },
          ],
          site_name: "Twitch Chat Overlay",
        }}
        twitter={{
          handle: "@rvn_dl",
          site: "@rvn_dl",
          cardType: "summary_large_image",
        }}
      />
      <Toaster />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

