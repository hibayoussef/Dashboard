import { _axios } from "interceptor/http-config";

export const _EmailsApi = {
  post: (formData) => _axios.post("/email/send", formData),
};
