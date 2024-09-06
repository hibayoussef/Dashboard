import { useQuery } from "react-query";
import { _PermissionApi } from "./permission.service";

export const usePermissionsAll = () => {
  const { data, isLoading } = useQuery(["permissions"], () =>
    _PermissionApi.index().then((res) => res)
  );

  return {
    data,
    isLoading,
  };
};
