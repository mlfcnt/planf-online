import "../styles.css";
import "@zach.codes/react-calendar/dist/calendar-tailwind.css";
import "antd/dist/antd.css";
import { MainLayout } from "../Layout/MainLayout";

const MyApp = ({ Component, pageProps }) => {
  return (
    <MainLayout>
      <Component {...pageProps} />
    </MainLayout>
  );
};

export default MyApp;
