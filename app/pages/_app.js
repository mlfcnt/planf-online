import "antd/dist/antd.css";
import "../styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Head from "next/head";
import { ConfigProvider } from "antd";
import locale from "antd/lib/locale/fr_FR";

import { MainLayout } from "../Layout/MainLayout";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Planf'Online</title>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <MainLayout>
        <ConfigProvider locale={locale}>
          <Component {...pageProps} />
        </ConfigProvider>
      </MainLayout>
    </>
  );
};

export default MyApp;
