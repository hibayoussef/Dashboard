import { useState } from "react";
import { useQuery } from "react-query";
import { _RoleApi } from "./Role.service";

export const usePermission = (perPage) => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const { data, isLoading, refetch } = useQuery(
    ["permissions", page, query, perPage],
    () =>
      _RoleApi
        .allPermissions({
          page,
          query,
          perPage,
        })
        .then((res) => res)
  );

  return {
    data,
    isLoading,
    page,
    setPage,
    refetch,
    setQuery,
  };
};
