import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { NextSeo } from "next-seo";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
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

