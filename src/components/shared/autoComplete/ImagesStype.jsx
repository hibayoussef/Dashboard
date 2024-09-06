import { useTheme } from "@emotion/react";
import { Box, CircularProgress } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useSystemSetting } from "services/system_setting/useSystemSetting";

export default function ImagesStype({
  setImagetypes,
  label,
  defaultValue,
  helperText,
  error,
  image_types,
  name,
  ...rest
}) {
  const theme = useTheme();
  const [value, setValue] = useState([]);
  const { data, isLoading } = useSystemSetting();

  useEffect(() => {
    if (image_types) {
      setValue(image_types);
      setImagetypes("image_types", image_types);
    }
  }, [image_types, setImagetypes]);
  return (
    <Box>
      <Autocomplete
        disableClearable
        loading
        multiple
        freeSolo
        value={value || []}
        onChange={(event, newValue) => {
          setImagetypes("image_types", newValue?.map((item) => item) ?? null);
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
        options={data?.data?.image_types ?? []}
        getOptionLabel={(option) => option || ""}
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
        {/* {data?.data?.users?.map((option) => (
          <div key={option?.id}>{option.name}</div>
        ))} */}
      </Autocomplete>
    </Box>
  );
}
