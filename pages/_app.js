import { LocalizeProvider } from "../contexts/LocalizeContext";
import Layout from "../layouts/app.layout";
import "../styles/globals.css";
import "../styles/imports.sass";
import "../styles/global.less";
import { useRouter } from "next/router";
import { useMemo } from "react";
import "react-quill/dist/quill.snow.css";
import { AuthProvider } from "../contexts/AuthContext";
// import { CandidateProvider } from "../contexts/CandidateContext";
import { MenuProvider } from "../contexts/MenuContext";
import { NotificationProvider } from "../contexts/NotificationContext";
import Notification from "../base/Notification.base";
import { CompanyProvider } from "../contexts/CompanyContext";

const AUTH = ["/reset-password"];

function MyApp({ Component, pageProps }) {
  const { route } = useRouter();
  const renderApp = useMemo(() => {
    if (route === "/" || AUTH.includes(route)) {
      return <Component {...pageProps} />;
    }
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  }, [route, Component, pageProps]);

  return (
    <LocalizeProvider>
      <NotificationProvider>
        <AuthProvider>
          <MenuProvider>
            <CompanyProvider>
              {/* <CandidateProvider> */}
              {renderApp}
              {/* </CandidateProvider> */}
            </CompanyProvider>
          </MenuProvider>
        </AuthProvider>
        <Notification />
      </NotificationProvider>
    </LocalizeProvider>
  );
}

export default MyApp;
