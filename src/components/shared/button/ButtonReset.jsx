import { Button } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const ButtonReset = ({ reset }) => {
  const { t } = useTranslation("index");

  const handleReset = () => {
    reset();
  };

  return (
    <Button
      id="rest"
      variant="outlined"
      sx={{
        borderColor: "origin.main",
      }}
      onClick={handleReset}
    >
      {t("reset")}
    </Button>
  );
};

export default ButtonReset;
