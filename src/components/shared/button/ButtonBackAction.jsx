import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { settingsStore } from "store/settingsStore";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
const ButtonBackAction = () => {
  const { t } = useTranslation("index");
  const navigate = useNavigate();
  const direction = settingsStore((state) => state.direction);

  return (
    <Button
      variant="outlined"
      startIcon={direction === "ltr" ? <ArrowBackIcon /> : <ArrowForwardIcon />}
      onClick={() => navigate(-1)}
    >
      {t("back")}
    </Button>
  );
};

export default ButtonBackAction;
