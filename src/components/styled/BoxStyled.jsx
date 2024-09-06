import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const BoxStyled = styled(Box)(({ theme }) => ({
  // backgroundColor: theme.palette?.card?.main,
  backgroundColor: theme.palette?.background?.paper,
  borderRadius: "16px",
  padding: "24px 0 24px 0",
  boxShadow:
    theme.palette.mode === "dark"
      ? "rgb(255 255 255 / 10%) 0px 0px 2px 0px, rgb(255 255 255 / 12%) 0px 12px 24px -4px"
      : "rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 52%) 0px 12px 24px -4px",
}));

// border: 1px solid ${theme.palette.borderColor.light} ;
