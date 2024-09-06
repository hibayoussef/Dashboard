import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import ButtonLoader from "components/shared/button/ButtonLoader";
import { BoxStyled } from "components/styled/BoxStyled";
import { TextFieldStyled } from "components/styled/TextField";
import LoginBg from "theme/LoginBg";
import { usePasswordEditForm } from "./hooks/usePasswordEditForm";

const PasswordEditForm = () => {
  const {
    t,
    errors,
    loading,
    register,
    onSubmit,
    navigate,
    handleSubmit,
    new_password,
    setNewPassword,
    new_password_confirmation,
    setConfirmPassword,
    showPassword,
    handleTogglePasswordVisibility,
  } = usePasswordEditForm();

  return (
    <LoginBg>
      <Button
        disableOnLoading
        loading={false}
        fullWidth
        type="submit"
        variant="contained"
        sx={{
          width: 130,
          alignItems: "center",
          color: "#fff",
          backgroundColor: "origin.main",
          "&:hover": { backgroundColor: "origin.hover" },
          textAlign: "center",
          ml: "50px",
          mt: "10px",
        }}
        onClick={() => navigate(-1)}
      >
        {t("back")}
      </Button>
      <Box
        sx={{
          minHeight: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "transparent",

          flexDirection: "column",
          backdropFilter: "bluer(20px)",
        }}
      >
        <BoxStyled
          sx={{
            minWidth: "350px",
            width: "30%",
            padding: "40px",
            zIndex: 10000,
            backgroundColor: "transparent",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
          style={{
            backdropFilter: " blur(3px)",
          }}
        >
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Box sx={{ width: "120px" }}></Box>
            <Typography variant="h5" sx={{ color: "white", mt: "10px" }}>
              {t("Reset password")}
            </Typography>
            <Typography variant="h6" sx={{ color: "gray", mt: "10px" }}>
              {t("Enter your credentials to continue")}
            </Typography>
          </Grid>
          <Box
            sx={{ width: "100%", mt: "30px" }}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Box sx={{ margin: "0 0 8px 5px" }}>
              <Typography
                variant="inputTitle"
                sx={{ color: "white" }}
                htmlFor="password"
              >
                {t("new password")}
              </Typography>
            </Box>
            <TextFieldStyled
              type={showPassword.new_password ? "text" : "password"}
              sx={{
                width: "100%",
                "& .MuiInputBase-input": { color: "white" },
              }}
              placeholder={t("enter your password")}
              {...register("password", { validate: true })}
              id="password"
              value={new_password}
              onChange={(e) => setNewPassword(e.target.value)}
              error={errors.password?.message}
              helperText={errors.password?.message || ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        handleTogglePasswordVisibility("new_password")
                      }
                    >
                      {showPassword.new_password ? (
                        <VisibilityOff sx={{ color: "#637381" }} />
                      ) : (
                        <Visibility sx={{ color: "#637381" }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ margin: "20px 0 8px 5px" }}>
              <Typography
                variant="inputTitle"
                htmlFor="confirm-password"
                sx={{ color: "white" }}
              >
                {t("Confirm password")}
              </Typography>
            </Box>
            <TextFieldStyled
              type={
                showPassword.new_password_confirmation ? "text" : "password"
              }
              sx={{
                width: "100%",
                "& .MuiInputBase-input": { color: "white" },
              }}
              placeholder={t("confirm password")}
              {...register("new_password_confirmation", { validate: true })}
              id="new_password_confirmation"
              value={new_password_confirmation}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={errors.new_password_confirmation?.message}
              helperText={errors.new_password_confirmation?.message || ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        handleTogglePasswordVisibility(
                          "new_password_confirmation"
                        )
                      }
                    >
                      {showPassword.new_password_confirmation ? (
                        <VisibilityOff sx={{ color: "#637381" }} />
                      ) : (
                        <Visibility sx={{ color: "#637381" }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                my: "10px",
              }}
            >
              {loading ? (
                <ButtonLoader
                  sx={{
                    display: "block",
                    width: 130,
                    height: 200,
                    backgroundColor: "origin.main",
                    margin: "30px auto 0 auto",
                    "&:hover": {
                      backgroundColor: "origin.hover",
                    },
                  }}
                  disableOnLoading
                  loading={true}
                  disabled={loading}
                  fullWidth
                >
                  {t("loading")}..
                </ButtonLoader>
              ) : (
                <Button
                  sx={{
                    display: "block",
                    width: 130,
                    color: "#fff",
                    backgroundColor: "origin.main",
                    "&:hover": { backgroundColor: "origin.hover" },
                    margin: "30px auto 0 auto",
                  }}
                  disabled={loading}
                  fullWidth
                  type="submit"
                  variant="contained"
                >
                  {t("update")}
                </Button>
              )}
            </Box>
          </Box>
        </BoxStyled>
      </Box>
    </LoginBg>
  );
};

export default PasswordEditForm;
