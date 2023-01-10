import "../styles/globals.css";
import type { AppProps } from "next/app";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Head from "next/head";
import { Footer, Navbar } from "flowbite-react";
config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
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
      <Navbar fluid={true} rounded={false} className="bg-[#F9FAFB]">
        <Navbar.Brand href="https://carbot.lol">
          🚗🤖&nbsp;
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            carbot
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
         <Navbar.Collapse>
          {/* <Navbar.Link href="/" active={true}>
            Vehicles
          </Navbar.Link> */}
        </Navbar.Collapse> 
      </Navbar>
      <div className="flex justify-center ">
        <Component {...pageProps} />
      </div>
      <Footer container={true}>
        <div className="w-full text-center">
          <Footer.Copyright href="#" by="CARBOT" year={2023} />
        </div>
      </Footer>
    </>
  );
}
