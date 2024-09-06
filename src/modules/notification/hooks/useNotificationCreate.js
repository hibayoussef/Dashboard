import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { _NotificationsApi } from "services/notifications/notifications.service";
import { useNotificationValidation } from "../validation/useNotificationValidation";

export const useNotificationCreate = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation("index");
  const { createValidation } = useNotificationValidation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formOptions = { resolver: yupResolver(createValidation) };
  const {
    register,
    handleSubmit,
    formState,
    control,
    setValue,
    clearErrors,
    watch,
    reset,
  } = useForm(formOptions);
  const { errors } = formState;

  const details = [
    {
      head: t("title"),
      type: "text",
      placeholder: t("title"),
      name: "title",
      register: "title",
      error: "title",
      helperText: "title",
    },
    {
      head: t("body"),
      type: "text",
      placeholder: t("body"),
      name: "body",
      register: "body",
      error: "body",
      helperText: "body",
    },
    {
      head: t("link"),
      type: "text",
      placeholder: t("link"),
      name: "link",
      register: "link",
      error: "link",
      helperText: "link",
    },
  ];

  const { mutate } = useMutation(createPost, {
    onMutate: async () => {
      await queryClient.prefetchQuery(["notifications"]);

      const previousData = queryClient.getQueryData(["notifications"]);

      queryClient.setQueryData(["notifications"], (oldData) => ({
        ...oldData,
      }));
      setLoading(true);
      return { previousData };
    },

    onSettled: (data, error, variables, context) => {
      setLoading(false);

      queryClient.invalidateQueries(["notifications"]);
    },
    onSuccess: () => {
      setLoading(false);
    },
  });

  async function createPost(data) {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("body", data.body);
    formData.append("link", data.link);
    formData.append("all_users", data.all_users ? data.all_users : 0);
    formData.append(
      "all_exhibitors",
      data.all_exhibitors ? data.all_exhibitors : 0
    );
    watch("all_users") === "0" &&
      data.user_ids.map((item, index) =>
        formData.append(`user_ids[${index}]`, item)
      );
    watch("all_exhibitors") === "0" &&
      data.exhibitor_ids.map((item, index) =>
        formData.append(`exhibitor_ids[${index}]`, item)
      );
    const response = await _NotificationsApi.post(formData);

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
    hanldeCreate,
    handleSubmit,
    register,
    navigate,
    setValue,
    clearErrors,
    watch,
    reset,
  };
};
