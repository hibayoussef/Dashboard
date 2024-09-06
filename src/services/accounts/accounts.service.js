import { _axios } from "interceptor/http-config";
import { HttpRequestInterceptor } from "interceptor/http-request.interceptor";

export const _AccountApi = {
  index: async ({ page, query }) => {
    return _axios
      .get(
        `/user/accounts?page=${page}&per_page=${100}${
          query !== "" ? `&search=${query}` : ""
        }`,
        {
          headers: {
            ...HttpRequestInterceptor(),
          },
        }
      )
      .then((res) => res.data);
  },
};
