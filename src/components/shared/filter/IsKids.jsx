import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useTheme } from "@emotion/react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";

export default function ControllableStates({ label, setIsKids }) {
  const { t } = useTranslation("index");

  const options = [
    {
      name: t("Yes"),
      value: "1",
    },
    {
      name: t("No"),
      value: "0",
    },
  ];
  const theme = useTheme();
  const [value, setValue] = React.useState();
  useEffect(() => {
    if (value && setIsKids) {
      setIsKids(value);
    } else {
      setIsKids(0);
    }
  }, [value, setIsKids]);

  return (
    <Box>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setIsKids(newValue?.value || "");
          setValue(newValue?.value || "");
        }}
        id="controllable-states-demo"
        options={options}
        getOptionLabel={(option) => option?.name}
        sx={{
          width: "100%",
          color: "text.main",
          options: { color: "#fff" },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            sx={{
              color: "#fff",
              label: { color: "text.main" },
              options: { color: "#fff" },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: theme.palette.origin.main,
                },
              },
              "& .css-i4bv87-MuiSvgIcon-root": {
                backgroundColor: "lightgray",
                borderRadius: "100%",
              },
            }}
          />
        )}
      />
    </Box>
  );
}
