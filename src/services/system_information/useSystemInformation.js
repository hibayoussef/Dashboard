import { useQuery } from "react-query";
import { _SystemInformationApi } from "./system_information.service";

export const useSystemInformation = () => {
  const { data, isLoading, refetch } = useQuery(["system-informations"], () =>
    _SystemInformationApi.index().then((res) => res)
  );

  return {
    data,
    isLoading,
    refetch,
  };
};
