import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useMutation, useQueryClient } from "react-query";
import { _ContactApi } from "services/contact-information/contact.service";
import { categoryStore } from "store/categoryStore";
import { useContactValidation } from "../validation/useContactValidation";

export const useContactUpdate = ({ value }) => {
  const { t } = useTranslation("index");
  const { updateValidation } = useContactValidation();
  const [loading, setLoading] = useState(false);
  const [editedID, setEditedID] = categoryStore((state) => [
    state.editedID,
    state.setEditedID,
  ]);

  const formOptions = { resolver: yupResolver(updateValidation) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  const [open, setOpen] = useState(true);

  const details = [
    {
      head: t("Value"),
      type: "text",
      placeholder: t("Value"),
      name: "value",
      register: "value",
      error: "value",
      helperText: "value",
      defaultValue: value ? value : "N/A",
    },
  ];
  const handleClose = () => {
    setOpen(false);
    setEditedID(null);
  };

  const queryClient = useQueryClient();
  const mutation = useMutation(
    (data) => {
      return _ContactApi.update({ ...data, contact_id: editedID });
    },
    {
      onMutate: async () => {
        await queryClient.prefetchQuery(["contacts"]);

        const previousData = queryClient.getQueryData(["contacts"]);

        queryClient.setQueryData(["contacts", editedID], (oldData) => ({
          ...oldData,
        }));
        setLoading(true);
        return { previousData };
      },

      onSettled: (error) => {
        if (!error) {
          setOpen(false);
        }
        setLoading(false);

        queryClient.invalidateQueries(["contacts"]);
      },
      onSuccess: () => {
        setLoading(false);
        setEditedID(false);
      },
    }
  );

  const handleUpdate = async (input) => {
    setLoading(true);
    await mutation.mutateAsync(input);
  };

  return {
    t,
    open,
    errors,
    details,
    loading,
    register,
    handleSubmit,
    handleUpdate,
    handleClose,
  };
};
