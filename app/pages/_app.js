import "antd/dist/antd.css";
import "../styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Head from "next/head";

import { MainLayout } from "../Layout/MainLayout";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Planf'Online</title>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </>
  );
};

export default MyApp;
