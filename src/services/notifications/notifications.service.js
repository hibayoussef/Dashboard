import { _axios } from "interceptor/http-config";
import { HttpRequestInterceptor } from "interceptor/http-request.interceptor";

export const _NotificationsApi = {
  index: async () => {
    return _axios
      .get(`/notifications`, {
        headers: {
          ...HttpRequestInterceptor(),
        },
      })
      .then((res) => res.data);
  },
  post: (formData) => _axios.post("/notification/send", formData),
};
