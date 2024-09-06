import { _axios } from "interceptor/http-config";
import { HttpRequestInterceptor } from "interceptor/http-request.interceptor";

export const _ContactApi = {
  index: async () => {
    return _axios
      .get(`/contact_information/all`, {
        headers: {
          ...HttpRequestInterceptor(),
        },
      })
      .then((res) => res.data);
  },
  post: (formData) => _axios.post("/contact_information/create", formData),
  update: (data) => _axios.patch(`/contact_information/update`, data),
};
