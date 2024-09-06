import { Box } from "@mui/material";
import { HttpRequestInterceptor } from "interceptor/http-request.interceptor";
import { HttpResponseInterceptor } from "interceptor/http-response.interceptor";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import AppRouting from "./AppRouting";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    HttpRequestInterceptor();
    HttpResponseInterceptor(navigate);
    const handleVisibilityChange = () => {
      document.title = document.hidden ? "Come Back :(" : "Dashboard";
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
  return (
    <Box color="background.main">
      <AppRouting />
    </Box>
  );
}

export default App;
