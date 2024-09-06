import { useState } from "react";
import { useQuery } from "react-query";
import { _SettingsApi } from "services/settings/setting.service";

export const useSettings = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const { data, isLoading, refetch } = useQuery(["settings", page, query], () =>
    _SettingsApi
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
    setQuery,
    refetch,
  };
};
