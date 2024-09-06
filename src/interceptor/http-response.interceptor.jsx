import { _axios as Axios } from "../interceptor/http-config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { _AuthApi } from "services/auth/auth.service";
export const HttpResponseInterceptor = (navigate) => {
  Axios.interceptors.response.use(
    function (response) {
      // Do something with response data
      switch (response?.config?.method) {
        case "post":
          toast.success(response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          break;
        case "put":
          toast.success(response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          break;
        case "patch":
          toast.success(response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          break;

        case "delete":
          toast.success(response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          break;

        default:
          break;
      }

      return response;
    },
    function (error) {
      // make a copy of the original request to do it again incase we need to refresh the token
      // const originalRequest = error?.config;

      switch (error?.response?.status) {
        case 404:
          toast.error(error.response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          break;

        case 400:
          if (!error?.response?.data) {
            toast.error("An unexpected error occurred. Please try again later");
          }
          if (typeof error?.response?.data?.message === "object") {
            Object.values(error?.response?.data.message).forEach(
              (errorMessages) => {
                errorMessages.forEach((errorMessage) => {
                  toast.error(`${errorMessage}`);
                });
              }
            );
          }
          if (typeof error?.response?.data?.message === "string") {
            toast.error(`${error?.response?.data?.message}`);
          }
          break;
        case 422:
          if (!error?.response?.data) {
            toast.error("An unexpected error occurred. Please try again later");
          }
          if (typeof error?.response?.data?.message === "object") {
            Object.values(error?.response?.data.message).forEach(
              (errorMessages) => {
                errorMessages.forEach((errorMessage) => {
                  toast.error(`${errorMessage}`);
                });
              }
            );
          }
          if (typeof error?.response?.data?.message === "string") {
            toast.error(`${error?.response?.data?.message}`);
          }
          break;

        case 500:
          toast.error(error.response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          break;
        case 409:
          toast.error(error.response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          break;

        case 405:
          Object.keys(error.response.data.message).map((key) =>
            toast.error(error.response.data.message[key], {})
          );
          break;

        case 401:
          navigate("/");
          _AuthApi.destroyToken();
          toast.error(error.response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          break;

        case 403:
          // _AuthApi.destroyToken();
          navigate("/");
          toast.error(error.response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          break;

        // case 400:
        default:
          toast.error(error.response?.data?.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          break;
      }

      return Promise.reject(error);
    }
  );
};

// hello
