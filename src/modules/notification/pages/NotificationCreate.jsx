import { Box, Grid, Typography } from "@mui/material";
import ButtonAction from "components/shared/button/ButtonAction";
import ButtonBackAction from "components/shared/button/ButtonBackAction";
import ButtonReset from "components/shared/button/ButtonReset";
import Loader from "components/shared/Loader";
import { BoxStyled } from "components/styled/BoxStyled";
import { TextFieldStyled } from "components/styled/TextField";
import { Controller } from "react-hook-form";
import { useNotificationCreate } from "../hooks/useNotificationCreate";
const NotificationCreate = () => {
  const {
    t,
    errors,
    control,
    details,
    loading,
    hanldeCreate,
    handleSubmit,
    register,
    reset
  } = useNotificationCreate();
  return (
    <Box>
      {loading && <Loader />}

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography sx={{ color: "text.main", mb: "16px" }} variant="h5">
          {t("notifications.create_notifications")}
        </Typography>
        <ButtonBackAction />
      </Box>

      <BoxStyled sx={{ px: "24px" }}>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={6} sx={{}}>
             
            </Grid>
            <Grid item xs={6} sx={{}}>
             
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6} sx={{}}>
            </Grid>
            <Grid item xs={6} sx={{}}>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            {details.map((item, index) => (
              <Grid key={index} item xs={6} sx={{}}>
                <Box sx={{ margin: "0 0 8px 5px" }}>
                  <Typography
                    variant="inputTitle"
                    sx={{ textTransform: "capitalize" }}
                  >
                    {item.head}
                  </Typography>
                </Box>
                <Controller
                  name={item.name}
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
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box
          sx={{
            mt: "20px",
            display: "flex",
            justifyContent: "flex-end",
            columnGap: "15px",
            width: "100%",
          }}
        >
          <ButtonReset reset={reset} />

          <ButtonAction
            disabled={loading ? true : false}
            name={t("submit")}
            onClick={() => handleSubmit(hanldeCreate)()}
            type={"submit"}
            sx={{
              width: "100%",
            }}
          />
        </Box>
      </BoxStyled>
    </Box>
  );
};

export default NotificationCreate;
