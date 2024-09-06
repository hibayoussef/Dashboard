import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import { _AuthApi } from "services/auth/auth.service";
import * as yup from "yup";
export const useChangePassword = ({ setChangePasswordDialog }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation("navbar");
  const [loading, setLoading] = useState(false);

  let validation = yup.object().shape({
    old_password: yup
      .string()
      .required(t("Old password is required"))
      .min(6, t("Old password must be of six characters"))
      .max(20, t("Old password must be of 20 characters")),
    new_password: yup
      .string()
      .required(t("New password is required"))
      .min(6, t("New password must be of six characters"))
      .max(20, t("New password must be of 20 characters")),
    new_password_confirmation: yup
      .string()
      .required(t("New password confirmation is required"))
      .min(6, t("New password confirmation must be of six characters"))
      .max(20, t("New password confirmation must be of 20 characters"))
      .oneOf([yup.ref("new_password")], t("your password does not match")),
  });

  const formOptions = { resolver: yupResolver(validation) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  const [open, setOpen] = useState(true);
  const [showPassword, setShowPassword] = useState({
    old_password: false,
    new_password: false,
    new_password_confirmation: false,
  });
  const details = [
    {
      head: t("Old password"),
      type: "password",
      placeholder: t("Old password"),
      name: "old_password",
      register: "old_password",
      error: "old_password",
      helperText: "old_password",
    },
    {
      head: t("New password"),
      type: "password",
      placeholder: t("New password"),
      name: "new_password",
      register: "new_password",
      error: "new_password",
      helperText: "new_password",
    },
    {
      head: t("New password confirmation"),
      type: "password",
      placeholder: t("New password confirmation"),
      name: "new_password_confirmation",
      register: "new_password_confirmation",
      error: "new_password_confirmation",
      helperText: "new_password_confirmation",
    },
  ];
  const handleClose = () => {
    setOpen(false);
    setChangePasswordDialog(null);
  };

  const mutation = useMutation(
    (data) => {
      return _AuthApi.changePassword(data);
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
        setChangePasswordDialog(false);
      },
    }
  );

  const handleUpdate = async (input) => {
    setLoading(true);
    await mutation.mutateAsync(input);
  };
  const handleTogglePasswordVisibility = (fieldName) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [fieldName]: !prevState[fieldName],
    }));
  };
  return {
    t,
    open,
    errors,
    details,
    loading,
    register,
    handleClose,
    showPassword,
    handleSubmit,
    handleUpdate,
    handleTogglePasswordVisibility,
  };
};
