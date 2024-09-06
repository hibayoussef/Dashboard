import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValidation } from "pages/validation/useAuthValidation";
import { useTranslation } from "react-i18next";
import { _AuthApi } from "services/auth/auth.service";

export const usePasswordEditForm = () => {
  const { t } = useTranslation("auth");
  const { passEditSchema } = useAuthValidation();
  const [loading, setLoading] = useState(false);
  const { email, code } = useParams();
  const [new_password, setNewPassword] = useState("");
  const [new_password_confirmation, setConfirmPassword] = useState("");
  const formOptions = { resolver: yupResolver(passEditSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState({
    new_password: false,
    new_password_confirmation: false,
  });
  const handleTogglePasswordVisibility = (fieldName) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [fieldName]: !prevState[fieldName],
    }));
  };
  const onSubmit = async (e) => {
    setLoading(true);

    _AuthApi
      .passEdit({
        email,
        code,
        new_password,
        new_password_confirmation,
      })
      .then((res) => navigate("/", { replace: true }))
      .finally(() => setLoading(false));
  };
  return {
    t,
    errors,
    loading,
    register,
    onSubmit,
    navigate,
    handleSubmit,
    new_password,
    setNewPassword,
    new_password_confirmation,
    setConfirmPassword,
    showPassword,
    handleTogglePasswordVisibility,
  };
};
