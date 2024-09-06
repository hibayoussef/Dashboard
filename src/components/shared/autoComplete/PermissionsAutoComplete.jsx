import { useTheme } from "@emotion/react";
import { Box, CircularProgress } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { usePermission } from "services/role-permission/usePermission";

export default function PermissionsAutoComplete({
  setPermission,
  label,
  defaultValue,
  helperText,
  error,
  id,
  permissions,
  name,
  ...rest
}) {
  const theme = useTheme();
  const [value, setValue] = useState([]);
  const { data, isLoading } = usePermission(`${100000}`);

  useEffect(() => {
    if (permissions) {
      const initialPermissions = permissions.map((item) => ({
        id: item.id,
        name: item.name,
      }));
      setValue(initialPermissions);
      setPermission(
        "permission_ids",
        initialPermissions.map((item) => item.id)
      );
    }
  }, [permissions, setPermission]);

  return (
    <Box>
      <Autocomplete
        disableClearable
        loading
        multiple
        value={value || []}
        onChange={(event, newValue) => {
          setPermission(
            "permission_ids",
            newValue?.map((item) => item.id) ?? null
          );
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
