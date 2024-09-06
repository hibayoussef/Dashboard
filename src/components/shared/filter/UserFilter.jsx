import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useState } from "react";

import { useTheme } from "@emotion/react";
import { Box, CircularProgress } from "@mui/material";
import { useAccount } from "services/accounts/useAccount";

export default function ControllableStates({
  setUser,
  label,
  helperText,
  error,
  ...rest
}) {
  const [value, setValue] = useState(null);
  const theme = useTheme();
  const { data, isLoading } = useAccount();
  return (
    <Box>
      <Autocomplete
        loading
        value={value}
        onChange={(event, newValue) => {
          setUser(newValue?.id);
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
        options={data?.data?.users}
        getOptionLabel={(option) => option?.name ?? "N/A"}
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
                border: theme ? "1px solid gray" : "1px solid gray",
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
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {isLoading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          );
        }}
      >
        {data?.data?.users?.map((option) => (
          <Box key={option?.id}>{option?.name ?? "N/A"}</Box>
        ))}
      </Autocomplete>
    </Box>
  );
}
