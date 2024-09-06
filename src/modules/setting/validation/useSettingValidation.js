import { useTranslation } from "react-i18next";
import * as yup from "yup";
export const useSettingValidation = () => {
  const { t } = useTranslation("index");
  let createValidation = yup.object().shape({
    value: yup.string().required(t("setttings.validation.value")),
  });
  let updateValidation = yup.object().shape({});
  return { updateValidation, createValidation };
};
