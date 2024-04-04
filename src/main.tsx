import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import "@app/config/axios.ts";
import router from "@app/router";
import SpinLoading from "./components/atoms/SpinLoading/SpinLoading.tsx";
import i18n from "./config/i18n.ts";
import "./index.css";
import store from "./redux/store.ts";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <Suspense fallback={<SpinLoading />}>
          <RouterProvider router={router} />
        </Suspense>
      </Provider>
    </I18nextProvider>
  </QueryClientProvider>
);
