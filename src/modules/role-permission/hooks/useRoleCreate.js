import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { _RoleApi } from "services/role-permission/Role.service";
import { usePermissionValidation } from "../validation/usePermissionValidation";

export const useRoleCreate = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation("index");
  const { createValidation } = usePermissionValidation();
  const [loading, setLoading] = useState(false);
  const formOptions = { resolver: yupResolver(createValidation) };
  const {
    handleSubmit,
    formState,
    control,
    register,
    setValue,
    clearErrors,
    reset,
  } = useForm(formOptions);
  const { errors } = formState;

  const details = [
    {
      head: t("Name"),
      type: "text",
      placeholder: t("Name"),
      name: "name",
      register: "name",
      error: "name",
      helperText: "name",
    },
  ];
  const navigate = useNavigate();
  const { mutate } = useMutation(createPost, {
    onMutate: async () => {
      await queryClient.prefetchQuery(["roles"]);
      setLoading(true);
    },

    onSettled: (data, error, variables, context) => {
      setLoading(false);

      queryClient.invalidateQueries(["roles"]);
    },
    onSuccess: () => {
      setLoading(false);
      navigate(-1);
    },
  });

  async function createPost(data) {
    const formData = new FormData();
    formData.append("name", data.name);
    data?.permission_ids?.map((item, index) =>
      formData.append(`permission_ids[${index}]`, item)
    );

    const response = await _RoleApi.post(formData).then(() => navigate(-1));
    return response.data;
  }
  const hanldeCreate = (data) => {
    mutate(data);
    setLoading(true);
  };
  return {
    t,
    errors,
    control,
    details,
    loading,
    register,
    hanldeCreate,
    handleSubmit,
    setValue,
    clearErrors,
    reset,
  };
};
