import "../styles/globals.css";
import type { AppProps } from "next/app";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Head from "next/head";
import Loader from "../components/loader/Loader";
config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
     <Loader />
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <title>
          CARBOT - Aggregated Automobile Sales Data and Price Trends
        </title>

        <meta
          name="description"
          content="CARBOT leverages aggregated automobile sales data sourced from leading online auction platforms to generate visually compelling insights and track price trends in the car market. Keep up-to-date with the latest trends and make informed decisions with CARBOT."
        />

        <meta
          name="keywords"
          content="automobile sales data, car prices, price trends, online auctions, car market"
        />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.carbot.com/" />
        <link rel="icon" href="/robot.svg" />
      </Head>
     
      <Component {...pageProps} />
     
     
    </>
  );
}
