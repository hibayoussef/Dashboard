import { _axios } from "interceptor/http-config";
import { HttpRequestInterceptor } from "interceptor/http-request.interceptor";

export const _StoreAPI = {
  index: async ({ page, query, status }) => {
    return _axios
      .get(
        `/store/accounts?page=${page}&per_page=${10}${
          query !== "" ? `&search=${query}` : ""
        }${!!status ? `&status=${status}` : ""}`,
        {
          headers: {
            ...HttpRequestInterceptor(),
          },
        }
      )
      .then((res) => res.data);
  },
};
