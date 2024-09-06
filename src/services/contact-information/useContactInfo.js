import { useQuery } from "react-query";
import { _ContactApi } from "./contact.service";

export const useContactInfo = () => {
  const { data, isLoading, refetch } = useQuery(["contacts"], () =>
    _ContactApi.index({}).then((res) => res)
  );

  return {
    data,
    refetch,
    isLoading,
  };
};
