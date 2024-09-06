import { useMutation, useQueryClient } from "react-query";
import { _RoleApi } from "./Role.service";

export const useDeleteRole = () => {
  const queryClient = useQueryClient();
  return useMutation((id) => _RoleApi.delete(id), {
    onMutate: async (id) => {
      await queryClient.cancelQueries(["roles"]);
      const previousData = queryClient.getQueriesData(["roles"]);
      queryClient.setQueryData(["roles"], (oldQueryData) => {
        const oldQueryDataCopy = oldQueryData?.filter((old) => +old.id !== +id);
        return oldQueryDataCopy;
      });
      return {
        previousData,
      };
    },
    onSuccess: () => {
      return queryClient.invalidateQueries(["roles"]);
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData(["roles"], context.prevuiosQuery);
    },
  });
};
