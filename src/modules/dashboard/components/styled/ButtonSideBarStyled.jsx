import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

export const ButtonSideBarStyled = styled(Button, {
  shouldForwardProp: (prop) => prop !== "active",
})(({ theme, active, openResBar }) => ({
  backgroundColor: "inherit",
  textDecoration: "none",
  minWidth: "100%",
  color: theme.palette.text?.main,
  width: openResBar ? "160px" : "100%",
  display: "flex",
  justifyContent: "start",
  padding: "12px 16px 12px 18px",
  borderRadius: "8px",
  alignItems: "center",
  minHeight: 48,
  columnGap: "15px",
  "&:hover": {
    backgroundColor: theme.palette.origin.hover,
    color: "white",
  },
  "& .MuiSvgIcon-root": {
    transition: "250ms",
  },
  ...(active && {
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.origin.main
        : theme.palette.origin.main,
    color: "white",
  }),
}));
