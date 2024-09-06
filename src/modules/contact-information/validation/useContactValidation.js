import { useTranslation } from "react-i18next";
import * as yup from "yup";
export const useContactValidation = () => {
  const { t } = useTranslation("index");

  let updateValidation = yup.object().shape({
    value: yup.string().required(t("value is required")),
  });
  return { updateValidation };
};
