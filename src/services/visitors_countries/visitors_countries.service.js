import { _axios } from "interceptor/http-config";
import { HttpRequestInterceptor } from "interceptor/http-request.interceptor";

export const _CountriesVisitorsApi = {
  index: async ({ page, query, exhibition_id }) => {
    return _axios
      .get(
        `/statistics/visitors_countries?page=${page}&per_page=${5}${
          query !== "" ? `&search=${query}` : ""
        }${exhibition_id ? `&exhibition_id=${exhibition_id}` : ""}`,
        {
          headers: {
            ...HttpRequestInterceptor(),
          },
        }
      )
      .then((res) => res.data);
  },
};
