import { useQuery } from "react-query";
import { _ProfileApi } from "./profile.service";

export const useProfile = () => {
  const { data, isLoading } = useQuery(["profiles"], () =>
    _ProfileApi.index({}).then((res) => res)
  );

  return {
    data,
    isLoading,
  };
};
