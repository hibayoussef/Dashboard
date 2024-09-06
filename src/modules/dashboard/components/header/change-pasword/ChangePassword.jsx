import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, IconButton, InputAdornment, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ButtonLoader from "components/shared/button/ButtonLoader";
import Loader from "components/shared/Loader";
import { TextFieldStyled } from "components/styled/TextField";
import { useChangePassword } from "./useChangePassword";

const ChangePassword = ({ setChangePasswordDialog }) => {
  const {
    t,
    open,
    errors,
    details,
    loading,
    register,
    handleClose,
    showPassword,
    handleSubmit,
    handleUpdate,
    handleTogglePasswordVisibility,
  } = useChangePassword({ setChangePasswordDialog });
  return (
    <>
      {loading && <Loader />}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-elevation": {
              width: "100vw",
            },
          },
        }}
      >
        <DialogTitle sx={{ color: "origin.main" }}>
          {t("Change password")}
        </DialogTitle>
        <Box component="form">
          {details.map((item, index) => (
            <Box key={index}>
              <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
                <Box sx={{ margin: "0 0 8px 5px" }}>
                  <Typography sx={{ color: "origin.main" }}>
                    {item.head}
                  </Typography>
                </Box>
                <TextFieldStyled
                  sx={{ width: "100%" }}
                  type={showPassword[item.name] ? "text" : "password"}
                  placeholder={item.placeholder}
                  defaultValue={item.defaultValue}
                  name={item.name}
                  {...register(item.register)}
                  error={errors[item.error]?.message}
                  helperText={errors[item.helperText]?.message || ""}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            handleTogglePasswordVisibility(item.name)
                          }
                        >
                          {showPassword[item.name] ? (
                            <VisibilityOff sx={{ color: "#637381" }} />
                          ) : (
                            <Visibility sx={{ color: "#637381" }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </DialogContent>
            </Box>
          ))}
        </Box>
        <DialogActions sx={{ display: "flex", gap: "10px" }}>
          <Button onClick={handleClose} sx={{ color: "origin.main" }}>
            {t("cancel")}
          </Button>

          <ButtonLoader
            onClick={() => handleSubmit(handleUpdate)()}
            type="submit"
            loading={loading}
            style={{ color: "#fff" }}
          >
            {t("submit")}
          </ButtonLoader>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ChangePassword;
