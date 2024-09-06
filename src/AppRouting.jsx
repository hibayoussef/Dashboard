import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Navigate, Route, Routes } from "react-router-dom";
import {
  DashboardRouting,
  PasswordEditForm,
  ResetPassword,
  VerificationCodeForm,
} from "routes/route";
import Loader from "./components/shared/Loader";
import ShouldBeLogged from "./middlewares/ShouldBeLogged";
import ShouldNotBeLogged from "./middlewares/ShouldNotBeLogged";
import Login from "./pages/Login";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const AppRouting = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ShouldNotBeLogged>
            <Login />
          </ShouldNotBeLogged>
        }
      />

      <Route path="/reset-password" element={<ResetPassword />} />
      <Route
        path="/reset-password/check-code/:email"
        element={<VerificationCodeForm />}
      />
      <Route
        path="/reset-password/edit-password/:email/:code"
        element={<PasswordEditForm />}
      />
      <Route path="/" element={<Navigate to="/reset-password" />} />
      <Route
        path="Dashboard/*"
        element={
          <ShouldBeLogged>
            <React.Suspense fallback={<Loader />}>
              <QueryClientProvider client={queryClient}>
                <DashboardRouting />
                <ReactQueryDevtools initialIsOpen={false} />
              </QueryClientProvider>
            </React.Suspense>
          </ShouldBeLogged>
        }
      />
    </Routes>
  );
};

export default AppRouting;
