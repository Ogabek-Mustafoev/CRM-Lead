import React from "react";
import {ConfigProvider} from "antd";
import {Provider} from "react-redux";
import ReactDOM from "react-dom/client";
import {ToastContainer} from "react-toastify";
import {BrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

import {store} from "@/store";
import App from "./App.jsx";

import "antd/dist/reset.css";
import 'react-toastify/dist/ReactToastify.css';
import "./styles/global.scss";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#66646d',
            },
          }}
        >
          <BrowserRouter>
            <ToastContainer/>
            <App/>
            {/*{import.meta.env.MODE === "development" && (*/}
            {/*  <ReactQueryDevtools initialIsOpen={false} />*/}
            {/*)}*/}
          </BrowserRouter>
        </ConfigProvider>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
