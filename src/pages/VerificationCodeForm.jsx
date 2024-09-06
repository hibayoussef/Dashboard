import { Box, Button, Grid, Typography } from "@mui/material";
import ButtonLoader from "components/shared/button/ButtonLoader";
import { BoxStyled } from "components/styled/BoxStyled";
import { TextFieldStyled } from "components/styled/TextField";
import { useEffect, useState } from "react";
import LoginBg from "theme/LoginBg";
import { useVerificationCodeForm } from "./hooks/useVerificationCodeForm";

const VerificationCodeForm = () => {
  const {
    t,
    code,
    email,
    errors,
    setCode,
    onSubmit,
    navigate,
    register,
    resendCode,
    handleSubmit,
    loading,
  } = useVerificationCodeForm();
  const [resendCodeTimer, setResendCodeTimer] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    let timer;
    if (resendCodeTimer > 0) {
      timer = setInterval(() => {
        setResendCodeTimer((prevTime) => prevTime - 1);
      }, 1000);
    } else if (resendCodeTimer === 0) {
      setIsButtonDisabled(false);
    }

    return () => clearInterval(timer);
  }, [resendCodeTimer]);

  const handleResendCode = () => {
    resendCode();
    setIsButtonDisabled(true);
    setResendCodeTimer(20);
  };
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
            <Typography variant="h5" sx={{ color: "white", mt: "10px" }}>
              {t("Enter your code")}
            </Typography>

            <Typography
              variant="p"
              sx={{
                color: "lightGray.main",
                mt: "10px",
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              {t("An email with a verification code has been sent to")} {email}
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
                sx={{
                  color: "white",
                }}
                htmlFor="code"
              >
                {t("Code")}
              </Typography>
            </Box>

            <TextFieldStyled
              type="text"
              sx={{
                width: "100%",
                "& .MuiInputBase-input": { color: "white" },
              }}
              placeholder={t("*********")}
              {...register("code", { validate: true })}
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              error={errors.code?.message}
              helperText={errors.code?.message || ""}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "30px auto 0 auto",
              }}
            >
              {loading ? (
                <ButtonLoader
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
                    "&:hover": { backgroundColor: "origin.hover" },
                  }}
                  disabled={loading}
                  fullWidth
                  type="submit"
                  variant="contained"
                >
                  {t("Verify code")}
                </Button>
              )}
            </Box>

            {/* <Button
              sx={{
                display: "block",
                width: 200,

                margin: "30px auto 0 auto",
                backgroundColor: "origin.main",
                "&:hover": { backgroundColor: "origin.hover" },
              }}
              disableOnLoading
              loading={false}
              fullWidth
              type="submit"
              variant="contained"
            >
              {t("Verify code")}
            </Button> */}
          </Box>
          {isButtonDisabled === false ? (
            <Button
              sx={{
                display: "block",
                width: 200,
                backgroundColor: "transparent",
                margin: "30px auto 0 auto",
              }}
              disabled={isButtonDisabled}
              fullWidth
              variant="outlined"
              onClick={handleResendCode}
            >
              {t("Resend code")}
            </Button>
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                margin: "30px auto 0 auto",
                justifyContent: "center",
                width: "100%",
              }}
            >
              <Typography
                sx={{
                  color: "white",
                }}
              >{`Resend code in ${resendCodeTimer}s`}</Typography>
            </Box>
          )}
        </BoxStyled>
      </Box>
    </LoginBg>
  );
};

export default VerificationCodeForm;
