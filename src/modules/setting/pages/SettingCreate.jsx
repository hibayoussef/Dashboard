import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import ButtonAction from "components/shared/button/ButtonAction";
import ButtonReset from "components/shared/button/ButtonReset";
import Loader from "components/shared/Loader";
import { TextFieldStyled } from "components/styled/TextField";
import { Controller } from "react-hook-form";
import { useSettingCreate } from "../hooks/useSettingCreate";
const SettingCreate = ({ setCreate }) => {
  const {
    t,
    errors,
    control,
    details,
    loading,
    register,
    hanldeCreate,
    handleSubmit,
    mode,
    watch,
    image,
  } = useSettingCreate({ setCreate });
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "background.main",
        width: { xs: "90%", lg: "20%" },
        height: "100%",
        zIndex: 100000,
      }}
    >
      <Box sx={{ p: "10px" }}>
        <IconButton onClick={() => setCreate(false)}>
          <Tooltip>
            <CloseIcon
              sx={{ color: mode === "dark" ? "#637381" : "#919EAB" }}
            />
          </Tooltip>
        </IconButton>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          height: "100%",
          p: "24px",
        }}
      >
        {loading && <Loader />}

        <Typography sx={{ color: "text.main" }} variant="h5">
          {t("services.create_services")}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            zIndex: 10000,
          }}
        >
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 5,
              mt: "10px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 5,
              }}
            >
              {details.map((item, index) => (
                <Box key={index} item xs={6}>
                  <Box sx={{ margin: "0 0 8px 5px" }}>
                    <Typography
                      variant="inputTitle"
                      sx={{ color: "origin.main" }}
                    >
                      {item.head}
                    </Typography>
                  </Box>
                  <Controller
                    name=""
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextFieldStyled
                        sx={{ width: "100%" }}
                        type={item.type}
                        placeholder={item.placeholder}
                        defaultValue={item.defaultValue}
                        name={item.name}
                        {...register(item.register)}
                        error={errors[item.error]?.message}
                        helperText={errors[item.helperText]?.message || ""}
                      />
                    )}
                  />
                </Box>
              ))}
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <Typography variant="inputTitle" sx={{ color: "origin.main" }}>
                {t("services.image")}
              </Typography>
              {!watch("files") ||
              watch("files") ||
              watch("files")?.length === 0 ? (
                <Box>
                  <TextFieldStyled
                    sx={{ width: "100%" }}
                    type="file"
                    id="fileuploaded"
                    {...register("files")}
                    error={errors?.files?.message}
                    helperText={errors?.files?.message || ""}
                  />
                </Box>
              ) : (
                <strong>{watch("files")[0]?.name}</strong>
              )}
              {errors.files && errors.files.type === "required" && (
                <Box className="error">File is required</Box>
              )}

              {image ? (
                <img
                  src={image}
                  alt=""
                  style={{
                    width: "100px",
                  }}
                />
              ) : (
                "null"
              )}
            </Box>
          </Box>

          <Box
            sx={{
              mt: "20px",
              display: "flex",
              justifyContent: "flex-end",
              columnGap: "15px",
            }}
          >
            <Button
              variant="outlined"
              sx={{
                width: "100%",
                borderColor: "origin.main",
                color: "origin.main",
                "&:hover": {
                  borderColor: "origin.main",
                },
              }}
              onClick={() => setCreate(false)}
            >
              {t("cancel")}
            </Button>
            <ButtonReset />

            <ButtonAction
              disabled={loading ? true : false}
              name={t("submit")}
              onClick={() => handleSubmit(hanldeCreate)()}
              type={"submit"}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SettingCreate;
