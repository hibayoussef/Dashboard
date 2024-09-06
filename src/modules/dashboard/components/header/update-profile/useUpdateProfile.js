import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import { _AuthApi } from "services/auth/auth.service";
import * as yup from "yup";
export const useUpdateProfile = ({ setUpdateProfileDialog, data }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation("navbar");
  const [loading, setLoading] = useState(false);
  let validation = yup.object().shape({
    full_name: yup.string().required("Full name is required"),
    email: yup.string().required("Email is required"),
    phone: yup.string().required("Phone is required"),
    // role_name: yup.string().required("Role name is required"),
  });

  const formOptions = { resolver: yupResolver(validation) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  const [open, setOpen] = useState(true);

  const details = [
    {
      head: t("Full name"),
      type: "text",
      placeholder: t("Full name"),
      name: "full_name",
      register: "full_name",
      error: "full_name",
      helperText: "full_name",
      defaultValue: data?.data?.full_name,
    },
    {
      head: t("Email"),
      type: "email",
      placeholder: t("Email"),
      name: "email",
      register: "email",
      error: "email",
      helperText: "email",
      defaultValue: data?.data?.email,
    },
    {
      head: t("Phone"),
      type: "tel",
      placeholder: t("Phone"),
      name: "phone",
      register: "phone",
      error: "phone",
      helperText: "phone",
      defaultValue: data?.data?.phone,
    },
    // {
    //   head: t("Role name"),
    //   type: "tel",
    //   placeholder: t("Role name"),
    //   name: "role_name",
    //   register: "role_name",
    //   error: "role_name",
    //   helperText: "role_name",
    //   defaultValue: data?.data?.role_name,
    // },
  ];
  const handleClose = () => {
    setOpen(false);
    setUpdateProfileDialog(null);
  };

  const mutation = useMutation(
    (data) => {
      return _AuthApi.updateProfile(data);
    },
    {
      onMutate: async () => {
        await queryClient.prefetchQuery(["profiles"]);

        const previousData = queryClient.getQueryData(["profiles"]);

        queryClient.setQueryData(["profiles"], (oldData) => ({
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
        queryClient.invalidateQueries(["profiles"]);
      },
      onSuccess: () => {
        setLoading(false);
        setUpdateProfileDialog(false);
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
    errors,
    details,
    loading,
    register,
    handleClose,
    handleSubmit,
    handleUpdate,
  };
};
