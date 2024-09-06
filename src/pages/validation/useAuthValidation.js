import { useTranslation } from "react-i18next";
import * as yup from "yup";
export const useAuthValidation = () => {
  const { t } = useTranslation("auth");

  let loginSchema = yup.object().shape({
    email: yup
      .string()
      .email(t("invalid email address"))
      .required(t("email is required")),

    password: yup
      .string()
      .required(t("password is required"))
      .min(6, t("the Password must be of six characters"))
      .max(20, t("the Password must be of 20 characters")),
  });
  let resetPassSchema = yup.object().shape({
    email: yup
      .string()
      .email("invalid email address")
      .required("email is required"),
  });
  let verifyCodeSchema = yup.object().shape({
    code: yup
      .string()
      .required(t("verification code is required"))
      .length(6, t("verification code must be 6 characters long"))
      .matches(/^[0-9]+$/, t("verification code must be a number")),
  });
  let passEditSchema = yup.object().shape({
    password: yup
      .string()
      .required(t("password is required"))
      .min(6, t("the Password must be of six characters"))
      .max(20, t("the Password must be of 20 characters")),

    new_password_confirmation: yup
      .string()
      .required(t("confirm password is required"))
      .min(6, t("the confirm password must be of six characters"))
      .max(20, t("the confirm password must be of 20 characters"))
      .oneOf([yup.ref("password")], t("your password does not match")),
    createdOn: yup.date().default(function () {
      return new Date();
    }),
  });
  return {
    loginSchema,
    passEditSchema,
    resetPassSchema,
    verifyCodeSchema,
  };
};
