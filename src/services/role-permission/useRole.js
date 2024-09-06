import { useState } from "react";
import { useQuery } from "react-query";
import { _RoleApi } from "./Role.service";

export const useRole = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const { data, isLoading, refetch } = useQuery(["roles", page, query], () =>
    _RoleApi
      .index({
        page,
        query,
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
