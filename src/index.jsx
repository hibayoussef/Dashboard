import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import App from "./App";
import "./I18n";
import { RTLProvider } from "./theme/providers/RTLProvider";
import { ThemeProviderWraper } from "./theme/providers/ThemeProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Suspense fallback="Loading">
      <RTLProvider>
        <ThemeProviderWraper>
          <ToastContainer />
          <App />
        </ThemeProviderWraper>
      </RTLProvider>
    </Suspense>
  </BrowserRouter>
);
