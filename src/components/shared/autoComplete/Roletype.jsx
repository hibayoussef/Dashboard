import { useTheme } from "@emotion/react";
import { Box, CircularProgress } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { TextFieldStyled } from "components/styled/TextField";
import { useEffect, useState } from "react";
import { useRole } from "services/role-permission/useRole";

export default function Roletype({
  setRole,
  label,
  helperText,
  error,
  id,
  name,
  ...rest
}) {
  const theme = useTheme();
  const [value, setValue] = useState(null);
  const { data, isLoading } = useRole();

  useEffect(() => {
    if (id) {
      setValue({
        id: id,
        name: name,
      });
      setRole("role_name", id);
    }
  }, [id, name, setRole]);
  return (
    <Box>
      <Autocomplete
        disableClearable
        loading
        value={value}
        onChange={(event, newValue) => {
          setRole("role_name", newValue?.id ?? null);
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
        options={data?.data?.data ?? []}
        getOptionLabel={(option) => option?.name || ""}
        renderInput={(params) => {
          return (
            <TextFieldStyled
              name="product"
              {...params}
              label={label}
              helperText={helperText}
              error={error}
              sx={{
                "& .css-i4bv87-MuiSvgIcon-root": {
                  backgroundColor: theme ? "gray" : "",
                  borderRadius: "100%",
                  color: "background.main",
                },
              }}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {isLoading ? (
                      <CircularProgress
                        sx={{ color: theme.palette.text.main }}
                        size={20}
                      />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          );
        }}
      >
        {/* {data?.data?.users?.map((option) => (
          <div key={option?.id}>{option.name}</div>
        ))} */}
      </Autocomplete>
    </Box>
  );
}
