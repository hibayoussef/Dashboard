import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useAuthValidation } from "pages/validation/useAuthValidation";
import { useTranslation } from "react-i18next";
import { _AuthApi } from "services/auth/auth.service";
export const useResetPassword = () => {
  const { t } = useTranslation("auth");
  const { resetPassSchema } = useAuthValidation();

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const formOptions = { resolver: yupResolver(resetPassSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  const onSubmit = async (e) => {
    setLoading(true);
    _AuthApi
      .forgetPassword({ email })
      .then((res) =>
        navigate(`/reset-password/check-code/${email}`, { replace: true })
      )
      .finally(() => setLoading(false));
  };

  return {
    t,
    email,
    errors,
    loading,
    navigate,
    register,
    onSubmit,
    setEmail,
    handleSubmit,
  };
};
