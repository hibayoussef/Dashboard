import { _axios } from "interceptor/http-config";
import { HttpRequestInterceptor } from "interceptor/http-request.interceptor";
export const _SettingsApi = {
  index: async ({ page,  query }) => {
    const { data } = await _axios.get(
      `/settings?page=${page}&per_page=${10}${
        query !== "" ? `&search=${query}` : ""
      }`,
      {
        headers: {
          ...HttpRequestInterceptor(),
        },
      }
    );
    return data;
  },
  post: async (formData) => {
    await _axios.post(`/settings`, formData);
  },
  update: ({ editedID, contentArabic, data }) =>
    _axios.put(`/settings/${editedID}`, { value: contentArabic || data }),

  delete: (id) => _axios.delete(`/settings/${id}`).then((res) => res.data),
};
