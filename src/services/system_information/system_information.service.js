import { _axios } from "interceptor/http-config";
import { HttpRequestInterceptor } from "interceptor/http-request.interceptor";

export const _SystemInformationApi = {
  index: async () => {
    return _axios
      .get(`/system_information/all`, {
        headers: {
          ...HttpRequestInterceptor(),
        },
      })
      .then((res) => res.data);
  },
  update: (data) => _axios.patch(`/system_information/update`, data),
};
