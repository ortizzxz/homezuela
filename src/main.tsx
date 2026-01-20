import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./i18n";
import "./assets/styles/index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { FullPageLoader } from "./components/FullPageLoader";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<FullPageLoader />}>
        <App />
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);
