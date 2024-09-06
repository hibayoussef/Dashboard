import { useState } from "react";
import { useQuery } from "react-query";
import { _AccountApi } from "services/accounts/accounts.service";

export const useAccount = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");

  const { data, isLoading, refetch } = useQuery(
    ["accounts", page, query, status],
    () =>
      _AccountApi
        .index({
          page,
          query,
          status,
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
    setStatus,
  };
};
