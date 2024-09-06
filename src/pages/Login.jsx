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
import { NavLink } from "react-router-dom";
import LoginBg from "theme/LoginBg";
import { useLogin } from "./hooks/useLogin";

const Login = () => {
  const {
    t,
    errors,
    loading,
    onSubmit,
    register,
    showPassword,
    handleSubmit,
    handleTogglePasswordVisibility,
  } = useLogin();
  return (
    <LoginBg>
      <Box
        sx={{
          minHeight: "100vh",
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
            <Typography variant="h5" sx={{ color: "white", mt: "10px" }}>
              {t("hi, welcome back")}
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: "gray", mt: "10px", textAlign: "center" }}
            >
              {t("enter your credentials to continue")}
            </Typography>
          </Grid>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ width: "100%" }}
          >
            <Box sx={{ width: "100%", mt: "20px" }}>
              <Box sx={{ margin: "0 0 8px 5px" }}>
                <Typography variant="inputTitle" sx={{ color: "white" }}>
                  {t("email")}
                </Typography>
              </Box>
              <TextFieldStyled
                type="email"
                sx={{
                  width: "100%",
                  "& .MuiInputBase-input": { color: "white" },
                }}
                placeholder={t("enter your email")}
                {...register("email", { validate: true })}
                error={errors.email?.message}
                helperText={errors.email?.message || ""}
              />
            </Box>
            <Box sx={{ width: "100%", mt: "20px" }}>
              <Box sx={{ margin: "0 0 8px 5px" }}>
                <Typography variant="inputTitle" sx={{ color: "white" }}>
                  {t("password")}
                </Typography>
              </Box>
              <TextFieldStyled
                sx={{
                  width: "100%",
                  "& .MuiInputBase-input": { color: "white" },
                }}
                type={showPassword ? "text" : "password"}
                placeholder={t("enter your password")}
                {...register("password")}
                error={errors.password?.message}
                helperText={errors.password?.message || ""}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePasswordVisibility}>
                        {showPassword ? (
                          <VisibilityOff
                            sx={{
                              color: "#637381",
                            }}
                          />
                        ) : (
                          <Visibility
                            sx={{
                              color: "#637381",
                            }}
                          />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 5,
              }}
            >
              <Box>
                {loading ? (
                  <ButtonLoader
                    sx={{
                      color: "#fff",
                      backgroundColor: "origin.main",
                      "&:hover": { backgroundColor: "origin.hover" },
                      width: 130,
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
                      color: "#fff",
                      backgroundColor: "origin.main",
                      "&:hover": { backgroundColor: "origin.hover" },
                      width: 130,
                    }}
                    disabled={loading}
                    fullWidth
                    type="submit"
                    variant="contained"
                  >
                    {t("sign in")}
                  </Button>
                )}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <NavLink to="/reset-password">
                  <Typography
                    variant="inputTitle"
                    sx={{
                      color: "blue",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                  >
                    {t("reset password")}
                  </Typography>
                </NavLink>
              </Box>
            </Box>
          </Box>
        </BoxStyled>
      </Box>
    </LoginBg>
  );
};

export default Login;
