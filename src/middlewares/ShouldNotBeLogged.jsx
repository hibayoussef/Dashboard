import { Navigate } from "react-router-dom";
import { _AuthApi } from "services/auth/auth.service";

const ShouldNotBeLogged = ({ children }) => {
  if (_AuthApi.getToken()) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default ShouldNotBeLogged;
