import { useTheme } from "@emotion/react";
import { Box, CircularProgress } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useSystemSetting } from "services/system_setting/useSystemSetting";

export default function VideosType({
  setVideotypes,
  label,
  defaultValue,
  helperText,
  error,
  video_types,
  name,
  ...rest
}) {
  const theme = useTheme();
  const [value, setValue] = useState([]);
  const { data, isLoading } = useSystemSetting();

  useEffect(() => {
    if (video_types) {
      setValue(video_types);
      setVideotypes("video_types", video_types);
    }
  }, [video_types, setVideotypes]);
  return (
    <Box>
      <Autocomplete
        disableClearable
        loading
        multiple
        freeSolo
        value={value || []}
        onChange={(event, newValue) => {
          setVideotypes("video_types", newValue?.map((item) => item) ?? null);
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
        options={data?.data?.video_types ?? []}
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
