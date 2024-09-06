import { _axios } from "interceptor/http-config";

export const _AuthApi = {
  login: async (data) => {
    return _axios.post("/login", data).then((res) => {
      _AuthApi.storeToken(res.data.data.token);
      _AuthApi.storeRole(res.data.data.roles?.map((item) => item));
    });
  },

  storeToken: (token) => {
    localStorage.setItem("token", token);
  },
  storeRole: (role) => {
    localStorage.setItem("role", role);
  },

  getToken: () => localStorage.getItem("token"),
  getRole: () => localStorage.getItem("role"),

  destroyToken: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.reload();
  },

  updateProfile: async (data) => {
    return _axios.patch("/update_profile", data);
  },
  changePassword: async (data) => {
    return _axios.patch("/change_password", data);
  },
  forgetPassword: async (data) => {
    return _axios.post("/forget_password", data);
  },
  resetPass: async (data) => {
    return _axios.post("/reset_password", data);
  },
  verifyCode: async (data) => {
    return _axios.post("/confirm_code", data);
  },
  resendCode: async (data) => {
    return _axios.post("/resend_code", data);
  },
  passEdit: async (data) => {
    return _axios.patch("/reset_password", data);
  },
};
