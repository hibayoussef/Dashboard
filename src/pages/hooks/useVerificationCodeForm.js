import { yupResolver } from "@hookform/resolvers/yup";
import { useAuthValidation } from "pages/validation/useAuthValidation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { _AuthApi } from "services/auth/auth.service";
export const useVerificationCodeForm = () => {
  const { t } = useTranslation("auth");
  const { verifyCodeSchema } = useAuthValidation();
  const { email } = useParams();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const formOptions = { resolver: yupResolver(verifyCodeSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  const onSubmit = async (e) => {
    setLoading(true);

    _AuthApi
      .verifyCode({ email, code })
      .then((res) =>
        navigate(`/reset-password/edit-password/${email}/${code}`, {
          replace: true,
        })
      )
      .finally(() => setLoading(false));
  };
  const resendCode = async (e) => {
    _AuthApi.resendCode({ email });
  };
  return {
    t,
    code,
    email,
    errors,
    setCode,
    onSubmit,
    navigate,
    register,
    resendCode,
    handleSubmit,
    loading,
  };
};
