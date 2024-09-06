import { _axios } from "interceptor/http-config";
import { HttpRequestInterceptor } from "interceptor/http-request.interceptor";

export const _SystemSettingApi = {
  index: async () => {
    return _axios
      .get(`/system_setting/all`, {
        headers: {
          ...HttpRequestInterceptor(),
        },
      })
      .then((res) => res.data);
  },
  update: (data) => _axios.put(`/system_setting/update`, data),
};
