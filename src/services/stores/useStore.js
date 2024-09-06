import { useState } from "react";
import { useQuery } from "react-query";
import { _StoreAPI } from "services/stores/store.service";

export const useStore = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");

  const { data, isLoading, refetch } = useQuery(
    ["store", page, query, status],
    () =>
      _StoreAPI
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
