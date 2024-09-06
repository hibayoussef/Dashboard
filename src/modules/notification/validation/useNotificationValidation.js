import { useTranslation } from "react-i18next";
import * as yup from "yup";
export const useNotificationValidation = () => {
  const { t } = useTranslation("index");
  let createValidation = yup.object().shape(
    {
      link: yup.string().url(),
      title: yup.string().required(t("Title is required")),
      body: yup.string().required(t("Body is required")),
      all_exhibitors: yup.string().when("all_users", {
        is: (val) => val === "0" || val === "1",
        then: () => yup.string(),
        otherwise: () => yup.string().required(t("All exhibitors is required")),
      }),
      all_users: yup.string().when("all_exhibitors", {
        is: (val) => val === "0" || val === "1",
        then: () => yup.string(),
        otherwise: () => yup.string().required(t("All users is required")),
      }),
      user_ids: yup
        .array()
        .of(yup.string())
        .when("all_users", {
          is: "0",
          then: () =>
            yup
              .array()
              .of(yup.string())
              .test(
                "at-least-one-selected",
                "At least one user must be selected",
                (value) => {
                  return value && value.length > 0;
                }
              ),
        }),
      exhibitor_ids: yup
        .array()
        .of(yup.string())
        .when("all_exhibitors", {
          is: "0",
          then: () =>
            yup
              .array()
              .of(yup.string())
              .test(
                "at-least-one-selected",
                "At least one exhibitor must be selected",
                (value) => {
                  return value && value.length > 0;
                }
              ),
        }),
    },
    [["all_exhibitors", "all_users"]]
  );

  return { createValidation };
};
