import "antd/dist/antd.css";
import "../styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Head from "next/head";
import { ConfigProvider } from "antd";
import locale from "antd/lib/locale/fr_FR";

import { MainLayout } from "../Layout/MainLayout";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const MyApp = ({ Component, pageProps }) => {
  const queryClientRef = React.useRef();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }
  return (
    <>
      <Head>
        <title>Planf'Online</title>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <QueryClientProvider client={queryClientRef.current}>
        <MainLayout>
          <ConfigProvider locale={locale}>
            <Component {...pageProps} />
          </ConfigProvider>
        </MainLayout>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
};

export default MyApp;
