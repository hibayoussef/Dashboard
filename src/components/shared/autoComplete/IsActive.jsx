import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Box, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export default function IsActive({
  setIsActive,
  label,
  helperText,
  error,
  defaultValue,
  name,
  id,
  ...rest
}) {
  const { t } = useTranslation("index");
  const [value, setValue] = React.useState(null);
  const theme = useTheme();
  const kidsDetails = [
    {
      name: t("Yes"),
      value: "1",
    },
    {
      name: t("No"),
      value: "0",
    },
  ];

  useEffect(() => {
    if (id) {
      setValue({
        id: id,
        name: name,
      });
      setIsActive("is_active", id);
    }
  }, [id, name, setIsActive]);
  return (
    <Box>
      <Autocomplete
        value={value}
        disableClearable
        loading
        onChange={(event, newValue) => {
          const selectedIds = newValue.value;
          setIsActive("is_active", selectedIds);
          setValue(newValue);
          rest?.onChange?.();
        }}
        id="controllable-states-demo"
        sx={{
          width: "100%",
          color: "text.main",
          borderRadius: "50px",
          options: { color: "#fff" },
          "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
              borderColor: theme.palette.origin.main,
            },
          },
        }}
        options={kidsDetails}
        getOptionLabel={(option) => option?.name}
        renderInput={(params) => {
          return (
            <TextField
              name="product"
              {...params}
              label={label}
              helperText={helperText}
              error={error}
              sx={{
                color: "#fff",
                label: { color: "gray" },
                options: { color: "#fff" },
                borderColor: "gray",
                borderRadius: "10px",
                "& .css-i4bv87-MuiSvgIcon-root": {
                  backgroundColor: theme ? "gray" : "",
                  borderRadius: "100%",
                  color: "background.main",
                },

                "& .css-1dybbl5-MuiChip-label": {
                  color: "text.main",
                },
              }}
            />
          );
        }}
      />
    </Box>
  );
}
