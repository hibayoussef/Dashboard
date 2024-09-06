import { _axios } from "interceptor/http-config";
import { HttpRequestInterceptor } from "interceptor/http-request.interceptor";

export const _RoleApi = {
  index: async ({ page, query }) => {
    return _axios
      .get(
        `/role/all?page=${page}&per_page=${10}${
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
  allPermissions: async ({ page, query, perPage }) => {
    return _axios
      .get(
        `/role/all_permissions?page=${page}&per_page=${perPage}${
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
  post: (formData) => _axios.post("/role/create", formData),
  delete: (id) => _axios.delete(`/role/delete`, { data: { role_id: id } }),
  update: (data) => _axios.put(`/role/update`, data),
};
