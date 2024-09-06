import { useState } from "react";
import { useQuery } from "react-query";
import { _CountriesVisitorsApi } from "./visitors_countries.service";

export const useCountriesVisitor = ({ exhibition_id }) => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  const { data, isLoading, refetch } = useQuery(
    ["countries-visitors", page, query, exhibition_id],
    () =>
      _CountriesVisitorsApi
        .index({
          page,
          query,
          exhibition_id,
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
    query,
  };
};
