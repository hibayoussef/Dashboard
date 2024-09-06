import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

export const TextFieldStyled = styled(TextField)(({ theme }) => ({
  "& .MuiInputBase-input ": {
    "&::placeholder": {
      color: "textColor.50",
      opacity: "0.4",
    },
    color: theme.palette.text.main,
    borderRadius: "14px !important",
  },
  "& label": {
    color: "#0195FF",
  },
  "& label.Mui-focused ": {
    color: "#0195FF",
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.origin.main,
    },
  },
  "&::hover": {
    borderColor: theme.palette.origin.main,
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderRadius: "14px",
    borderColor: theme.palette.text.main,
    "&:hover": {
      borderColor: theme.palette.origin.main,
    },
  },
  "& .MuiFilledInput-root": {
    border: "1px solid #e2e2e1",
    overflow: "hidden",
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&::hover": {
      borderColor: theme.palette.origin.main,
    },
    "&.Mui-focused": {
      backgroundColor: "transparent",
      borderColor: "theme.palette.origin.main",
    },
  },
}));
