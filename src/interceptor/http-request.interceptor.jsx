import { _AuthApi } from "services/auth/auth.service";
import { _axios as Axios } from "./http-config";

export const HttpRequestInterceptor = () => {
  Axios.interceptors.request.use(
    function (request) {
      // Do something before request is sent
      const token = _AuthApi.getToken();
      if (request.headers) {
        request.headers.Authorization = token ? `Bearer ${token}` : "";
        request.headers.Accept = "application/json";
        request.headers.lang = ["en", "ar"].includes(
          localStorage.getItem("i18nextLng")
        )
          ? localStorage.getItem("i18nextLng")
          : "en";
      }

      return request;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
};
