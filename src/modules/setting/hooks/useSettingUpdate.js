import { yupResolver } from "@hookform/resolvers/yup";
import { _axios } from "interceptor/http-config";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { _SettingsApi } from "services/settings/setting.service";
import { categoryStore } from "store/categoryStore";
import { useSettingValidation } from "../validation/useSettingValidation";
export const useSettingUpdate = ({ settingName }) => {
  const { t } = useTranslation("index");
  const { updateValidation } = useSettingValidation();
  const [loading, setLoading] = useState(false);
  const [editedID, setEditedID] = categoryStore((state) => [
    state.editedID,
    state.setEditedID,
  ]);
  const [contentArabic, setContentArabic] = useState("");

  const formOptions = { resolver: yupResolver(updateValidation) };
  const { handleSubmit, register, formState } = useForm(formOptions);
  const { errors } = formState;
  const [open, setOpen] = useState(true);

  const { data, isLoading, refetch } = useQuery(
    ["setting", `id-${editedID}`],
    async () => {
      return await _axios
        .get(`/settings/${editedID}`)
        .then((res) => res.data.data);
    },
    {}
  );
  const details = [
    {
      head: t("settings.value"),
      type: "text",
      placeholder: t("settings.value"),
      name: "value",
      register: "value",
      error: "value",
      helperText: "value",
      defaultValue: data?.value,
    },
  ];
  useEffect(() => {
    if (!isLoading && data) {
      setContentArabic(data?.value);
    }
  }, [data, isLoading]);

  const handleClose = () => {
    setOpen(false);
    setEditedID(null);
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(
    (data) => {
      return _SettingsApi.update({
        editedID,
        contentArabic,
        data,
      });
    },
    {
      onMutate: async () => {
        await queryClient.prefetchQuery(["settings"]);

        const previousData = queryClient.getQueryData(["settings"]);

        queryClient.setQueryData(["settings", editedID], (oldData) => ({
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
        queryClient.invalidateQueries(["settings"]);
      },
      onSuccess: () => {
        setLoading(false);
        setEditedID(false);
        refetch();
      },
    }
  );

  const handleUpdate = async (input) => {
    let updatedInput = { ...input };

    if (settingName === "term_of_use" || settingName === "privacy_policy") {
      updatedInput.contentArabic = contentArabic;
    } else {
      updatedInput.value = contentArabic;
    }

    if (contentArabic === "<p><br></p>" || contentArabic === "") {
      toast.error(t("settings.validation.value"), {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    setLoading(true);
    await mutation.mutateAsync(updatedInput);
  };

  return {
    t,
    open,
    data,
    loading,
    isLoading,
    handleSubmit,
    handleUpdate,
    handleClose,
    contentArabic,
    setContentArabic,
    register,
    details,
    errors,
  };
};
