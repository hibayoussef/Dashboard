import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import { _ServiceApi } from "services/api/services/services.service";
import { settingsStore } from "store/settingsStore";
import { useSettingValidation } from "../validation/useSettingValidation";

export const useSettingCreate = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation("index");
  const { createValidation } = useSettingValidation();
  const [mode] = settingsStore((state) => [state.mode]);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");

  const formOptions = { resolver: yupResolver(createValidation) };
  const { register, handleSubmit, formState, control, setValue, watch } =
    useForm(formOptions);
  const { errors } = formState;

  const conver2base64 = (file) => {
    if (!file) {
      setImage(null);
      setValue("image", "");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result.toString());
      setValue("image", reader.result.toString());
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (watch("files")) {
      conver2base64(watch("files")[0]);
    } else {
      setImage(null);
    }
  }, [watch("files")]);
  const details = [
    {
      head: t("services.name_ar"),
      type: "text",
      placeholder: t("services.name_ar"),
      name: "name_ar",
      register: "name_ar",
      error: "name_ar",
      helperText: "name_ar",
    },
    {
      head: t("services.name_en"),
      type: "text",
      placeholder: t("services.name_en"),
      name: "name_en",
      register: "name_en",
      error: "name_en",
      helperText: "name_en",
    },
  ];

  const { mutate } = useMutation(createPost, {
    onMutate: async () => {
      await queryClient.prefetchQuery(["services"]);
      setLoading(true);
    },

    onSettled: (data, error, variables, context) => {
      setLoading(false);

      queryClient.invalidateQueries(["services"]);
    },
    onSuccess: () => {
      setLoading(false);
    },
  });

  async function createPost(data) {
    const formData = new FormData();
    formData.append("name_en", data.name_en);
    formData.append("name_ar", data.name_ar);
    formData.append("image", data.files[0]);

    const response = await _ServiceApi.post(formData);
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
    mode,
    watch,
    image,
  };
};
