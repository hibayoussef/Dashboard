import { _axios } from "interceptor/http-config";

export const _StatisticApi = {
  index: async () => {
    const { data } = await _axios.get("/statistics");
    return data;
  },
};
