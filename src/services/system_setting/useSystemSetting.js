import { useQuery } from "react-query";
import { _SystemSettingApi } from "./system_setting.service";

export const useSystemSetting = () => {
  const { data, isLoading, refetch } = useQuery(["system-settings"], () =>
    _SystemSettingApi.index().then((res) => res)
  );

  return {
    data,
    isLoading,
    refetch,
  };
};
