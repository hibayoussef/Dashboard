import { useQuery } from "react-query";
import { _StatisticApi } from "services/statistic";

export const useStatistic = () => {
  const { data, isLoading, refetch } = useQuery(["statistic"], () =>
    _StatisticApi.index().then((res) => res.data)
  );

  return {
    data,
    isLoading,
    refetch,
  };
};
