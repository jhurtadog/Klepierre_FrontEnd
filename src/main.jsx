import React from "react";
import { ConfigProvider } from "antd";
import locale from "antd/locale/es_ES";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./i18n/config";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ConfigProvider locale={locale}>
    <App />
  </ConfigProvider>
);
