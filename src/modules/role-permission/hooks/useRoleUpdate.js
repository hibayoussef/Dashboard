import { yupResolver } from "@hookform/resolvers/yup";
import { _axios } from "interceptor/http-config";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { categoryStore } from "store/categoryStore";
import { usePermissionValidation } from "../validation/usePermissionValidation";
import { _RoleApi } from "services/role-permission/Role.service";

export const useRoleUpdate = () => {
  const { t } = useTranslation("index");
  const { updateValidation } = usePermissionValidation();
  const [loading, setLoading] = useState(false);
  const [editedID, setEditedID] = categoryStore((state) => [
    state.editedID,
    state.setEditedID,
  ]);

  const formOptions = { resolver: yupResolver(updateValidation) };
  const { register, handleSubmit, formState, setValue, clearErrors } =
    useForm(formOptions);
  const { errors } = formState;
  const [open, setOpen] = useState(true);

  const { data, isLoading, refetch } = useQuery(
    ["roles", `id-${editedID}`],
    async () => {
      return await _axios
        .get(`/role?role_id=${editedID}`)
        .then((res) => res.data?.data);
    },
    {}
  );
  const details = [
    {
      head: t("Name"),
      type: "text",
      placeholder: t("Name"),
      name: "name",
      register: "name",
      error: "name",
      helperText: "name",
      defaultValue: data?.name,
    },
  ];
  const handleClose = () => {
    setOpen(false);
    setEditedID(null);
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(
    (data) => {
      return _RoleApi.update({
        ...data,
        role_id: editedID,
      });
    },
    {
      onMutate: async () => {
        await queryClient.prefetchQuery(["roles"]);

        const previousData = queryClient.getQueryData(["roles"]);

        queryClient.setQueryData(["roles", editedID], (oldData) => ({
          ...oldData,
        }));
        setLoading(true);
        return { previousData };
      },

      onSettled: (error) => {
        if (!error) {
          setOpen(false);
        }
        setLoading(false);

        queryClient.invalidateQueries(["roles"]);
      },
      onSuccess: () => {
        setLoading(false);
        setEditedID(false);
        refetch();
      },
    }
  );

  const handleUpdate = async (input) => {
    setLoading(true);
    await mutation.mutateAsync(input);
  };

  return {
    t,
    open,
    data,
    errors,
    details,
    loading,
    register,
    isLoading,
    handleSubmit,
    handleUpdate,
    handleClose,
    setValue,
    clearErrors,
  };
};
