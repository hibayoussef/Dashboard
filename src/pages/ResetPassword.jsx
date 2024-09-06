import { Box, Button, Grid, Typography } from "@mui/material";
import { BoxStyled } from "components/styled/BoxStyled";
import { TextFieldStyled } from "components/styled/TextField";

import ButtonLoader from "components/shared/button/ButtonLoader";
import LoginBg from "theme/LoginBg";
import { useResetPassword } from "./hooks/useResetPassword";
const ResetPassword = () => {
  const {
    t,
    email,
    errors,
    loading,
    navigate,
    register,
    onSubmit,
    setEmail,
    handleSubmit,
  } = useResetPassword();
  return (
    <LoginBg>
      <Button
        // disableOnLoading
        // loading={false}
        fullWidth
        type="submit"
        variant="contained"
        sx={{
          width: 130,
          alignItems: "center",

          textAlign: "center",
          ml: "50px",
          mt: "10px",

          color: "#fff",
          backgroundColor: "origin.main",
          "&:hover": { backgroundColor: "origin.hover" },
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
              {t("reset password")}
            </Typography>
          </Grid>
          <Box
            sx={{ width: "100%", mt: "30px" }}
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
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
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email?.message}
              helperText={errors.email?.message || ""}
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
                    margin: "30px auto 0 auto",
                    "&:hover": {
                      backgroundColor: "origin.hover",
                    },
                    color: "#fff",
                    backgroundColor: "origin.main",
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
                    width: 200,
                    backgroundColor: "origin.main",
                    margin: "30px auto 0 auto",
                    "&:hover": {
                      backgroundColor: "origin.hover",
                    },
                  }}
                  disabled={loading}
                  fullWidth
                  type="submit"
                  variant="contained"
                >
                  {t("send verification code")}
                </Button>
              )}
            </Box>
          </Box>
        </BoxStyled>
      </Box>
    </LoginBg>
  );
};

export default ResetPassword;
