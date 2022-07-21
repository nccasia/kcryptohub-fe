import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { ToastContainer } from "react-toastify";
import { LayoutGuard } from "../layouts/LayoutGuard";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <LayoutGuard>
          <Component {...pageProps} />
        </LayoutGuard>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
