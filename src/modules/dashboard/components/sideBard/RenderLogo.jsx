import { Box, useTheme } from "@mui/material";
import logo from "assets/images/Layer 5.png";
import logoDark from "assets/images/LogoDark.svg";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const RenderLogo = () => {
  const theme = useTheme();
  const { t } = useTranslation("index");
  const navigate = useNavigate();

  const isDarkEn = theme.palette.mode === "dark" && theme.direction !== "rtl";
  const isDarkAr = theme.palette.mode === "dark" && theme.direction === "rtl";
  const isLightAr = theme.palette.mode === "light" && theme.direction === "rtl";
  const isLightEn = theme.palette.mode === "light" && theme.direction !== "rtl";

  if (isDarkEn)
    return (
      <Box
        onClick={() => navigate("/dashboard")}
        style={{
          cursor: "pointer",
          backgroundImage: `url(${logo})`,
          width: "100%",
          height: "150%",

          backgroundPosition: "center",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          borderRadius: "100%",
        }}
      ></Box>
    );
  else if (isDarkAr)
    return (
      <Box
        onClick={() => navigate("/dashboard")}
        style={{
          cursor: "pointer",
          backgroundImage: `url(${logo})`,
          width: "100%",
          height: "150%",

          backgroundPosition: "center",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          borderRadius: "100%",
        }}
      ></Box>
    );
  else if (isLightAr)
    return (
      <Box
        onClick={() => navigate("/dashboard")}
        style={{
          cursor: "pointer",
          backgroundImage: `url(${logoDark})`,
          width: "100%",
          height: "150%",

          backgroundPosition: "center",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          borderRadius: "100%",
        }}
      ></Box>
    );
  else if (isLightEn)
    return (
      <Box
        onClick={() => navigate("/dashboard")}
        style={{
          cursor: "pointer",
          backgroundImage: `url(${logoDark})`,
          width: "100%",
          height: "150%",

          backgroundPosition: "center",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          borderRadius: "100%",
        }}
      ></Box>
    );

  return <>{t("Logo")}</>;
};

export default RenderLogo;
