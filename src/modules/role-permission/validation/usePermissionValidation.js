import { useTranslation } from "react-i18next";
import * as yup from "yup";
export const usePermissionValidation = () => {
  const { t } = useTranslation("index");
  let createValidation = yup.object().shape({
    name: yup.string().required(t("Name is required")),
    permission_ids: yup
      .array()
      .of(yup.string())
      .test(
        "at-least-one-selected",
        "At least one permission must be selected",
        (value) => {
          return value && value.length > 0;
        }
      ),
  });
  let updateValidation = yup.object().shape({
    name: yup.string().required(t("Name is required")),
  });
  return { updateValidation, createValidation };
};
