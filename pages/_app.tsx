import "../styles/globals.css";
import type { AppProps } from "next/app";
import "tailwindcss/tailwind.css";
import { RecoilRoot } from "recoil";
import Auth from "../hoc/auth";
import "../styles/nprogress.css";
import nProgress from "nprogress";
import { Router } from "next/router";


Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Auth>
        <Component {...pageProps} />
      </Auth>
    </RecoilRoot>
  );
}

export default MyApp;
