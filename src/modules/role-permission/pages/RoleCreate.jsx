import { Box, Grid, Typography } from "@mui/material";
import ButtonAction from "components/shared/button/ButtonAction";
import ButtonBackAction from "components/shared/button/ButtonBackAction";
import ButtonReset from "components/shared/button/ButtonReset";
import Loader from "components/shared/Loader";
import { BoxStyled } from "components/styled/BoxStyled";
import { TextFieldStyled } from "components/styled/TextField";
import { Controller } from "react-hook-form";
import { useRoleCreate } from "../hooks/useRoleCreate";
import PermissionsAutoComplete from "components/shared/autoComplete/PermissionsAutoComplete";
const RoleCreate = () => {
  const {
    t,
    errors,
    control,
    details,
    loading,
    register,
    hanldeCreate,
    handleSubmit,
    setValue,
    clearErrors,
    reset,
  } = useRoleCreate();

  return (
    <Box>
      {loading && <Loader />}

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography sx={{ color: "text.main", mb: "16px" }} variant="h5">
          {t("Create role")}
        </Typography>
        <ButtonBackAction />
      </Box>

      <BoxStyled sx={{ px: "24px" }}>
        <Box component="form">
          <Grid container spacing={2}>
            {details.map((item, index) => (
              <Grid key={index} item xs={12} sx={{ p: "10px" }}>
                <Box sx={{ margin: "0 0 8px 5px" }}>
                  <Typography variant="inputTitle">{item.head}</Typography>
                </Box>
                <Controller
                  name="phone"
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
                      c
                    />
                  )}
                />
              </Grid>
            ))}
            <Grid item xs={12} sx={{ p: "10px" }}>
              <PermissionsAutoComplete
                setPermission={setValue}
                label={t("Permissions")}
                {...register("permission_ids")}
                error={errors.permission_ids?.message}
                helperText={errors.permission_ids?.message || ""}
                onChange={() => clearErrors("permission_ids")}
              />
            </Grid>
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

export default RoleCreate;
