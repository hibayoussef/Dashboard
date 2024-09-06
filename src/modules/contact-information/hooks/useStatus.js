import { _axios } from "interceptor/http-config";
import { useQueryClient, useMutation } from "react-query";

export const useStatus = ({ action, id }) => {
  const queryClient = useQueryClient();
  return useMutation(
    () =>
      _axios.patch(`/contact_information/change_status`, {
        new_status: action === true ? 1 : 0,
        contact_id: id,
      }),
    {
      onMutate: async (id) => {
        await queryClient.cancelQueries(["contacts"]);
        const previousData = queryClient.getQueriesData(["contacts"]);
        queryClient.setQueryData(["contacts"], (oldQueryData) => {
          const oldQueryDataCopy = oldQueryData.data?.map((old) =>
            +old.id === +id ? { ...old, status: !old.status } : old
          );
          const updatedData = {
            ...oldQueryData,
            data: oldQueryDataCopy,
          };
          return updatedData;
        });
        return {
          previousData,
        };
      },
      onSuccess: () => {
        return queryClient.invalidateQueries(["contacts"]);
      },
      onError: (_error, _hero, context) => {
        queryClient.invalidateQueries(["contacts"]);
      },
    }
  );
};
