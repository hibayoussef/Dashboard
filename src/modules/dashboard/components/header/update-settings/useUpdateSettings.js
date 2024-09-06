import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import { _SystemSettingApi } from "services/system_setting/system_setting.service";
import * as yup from "yup";
export const useUpdateSettings = ({ setUpdateProfileDialog, settings }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation("navbar");
  const [loading, setLoading] = useState(false);
  let validation = yup.object().shape({
    max_image_size: yup.string().required("max_image_size is required"),
    max_pdf_size: yup.string().required("max_pdf_size is required"),
    max_video_size: yup.string().required("max_video_size is required"),
    news_bar_status: yup.string().required("max_video_size is required"),
    image_types: yup
      .array()
      .of(yup.string())
      .test(
        "at-least-one-selected",
        "At least one types must be selected",
        (value) => {
          return value && value.length > 0;
        }
      ),
    video_types: yup
      .array()
      .of(yup.string())
      .test(
        "at-least-one-selected",
        "At least one types must be selected",
        (value) => {
          return value && value.length > 0;
        }
      ),
  });

  const formOptions = { resolver: yupResolver(validation) };
  const { register, handleSubmit, formState, setValue, clearErrors } =
    useForm(formOptions);
  const { errors } = formState;
  const [open, setOpen] = useState(true);
  // useEffect(() => {
  //   if (settings?.data?.image_types) {
  //     setValue("image_types", settings.data.image_types);
  //   }
  // }, [settings, setValue]);
  const details = [
    {
      head: t("Max image size"),
      type: "tel",
      placeholder: t("Max image size"),
      name: "max_image_size",
      register: "max_image_size",
      error: "max_image_size",
      helperText: "max_image_size",
      defaultValue: settings?.data?.max_image_size,
    },
    {
      head: t("Max pdf size"),
      type: "tel",
      placeholder: t("Max pdf size"),
      name: "max_pdf_size",
      register: "max_pdf_size",
      error: "max_pdf_size",
      helperText: "max_pdf_size",
      defaultValue: settings?.data?.max_pdf_size,
    },
    {
      head: t("Max video size"),
      type: "tel",
      placeholder: t("Max video size"),
      name: "max_video_size",
      register: "max_video_size",
      error: "max_video_size",
      helperText: "max_video_size",
      defaultValue: settings?.data?.max_video_size,
    },
  ];
  const handleClose = () => {
    setOpen(false);
    setUpdateProfileDialog(null);
  };
  const transformSwitchValue = (value) => {
    return value ? 1 : 0;
  };
  const [switchValue, setSwitchValue] = useState(settings.data.news_bar_status);
  const handleSwitchChange = () => {
    setSwitchValue(!switchValue);
  };

  const mutation = useMutation(
    (data) => {
      return _SystemSettingApi.update(data);
    },
    {
      onMutate: async () => {
        await queryClient.prefetchQuery(["system-settings"]);

        const previousData = queryClient.getQueryData(["system-settings"]);

        queryClient.setQueryData(["system-settings"], (oldData) => ({
          ...oldData,
        }));
        setLoading(true);
        return { previousData };
      },

      onSettled: (error) => {
        // if (!error) {
        //   setOpen(false);
        // }
        setLoading(false);
        queryClient.invalidateQueries(["system-settings"]);
      },
      onSuccess: () => {
        setLoading(false);
        setUpdateProfileDialog(false);
      },
    }
  );
  useEffect(() => {
    setSwitchValue(settings.data.news_bar_status);
  }, [settings.data.news_bar_status]);

  const handleUpdate = async (input) => {
    setLoading(true);
    const transformedValue = transformSwitchValue(switchValue);
    const inputData = { ...input, news_bar_status: transformedValue };
    await mutation.mutateAsync(inputData);
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
    setValue,
    clearErrors,
    switchValue,
    handleSwitchChange,
  };
};
