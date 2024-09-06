import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ButtonLoader from "components/shared/button/ButtonLoader";
import Loader from "components/shared/Loader";
import { TextFieldStyled } from "components/styled/TextField";
import { useRoleUpdate } from "../hooks/useRoleUpdate";
import PermissionsAutoComplete from "components/shared/autoComplete/PermissionsAutoComplete";

const RoleUpdate = ({ id }) => {
  const {
    t,
    open,
    data,
    errors,
    details,
    loading,
    register,
    isLoading,
    handleSubmit,
    handleUpdate,
    handleClose,
    setValue,
    clearErrors,
  } = useRoleUpdate();

  return (
    <>
      {isLoading && <Loader />}
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
        <DialogTitle sx={{ color: "origin.main" }}>{t("edit row")}</DialogTitle>
        {!!data && (
          <Box component="form" key={id}>
            <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
              <PermissionsAutoComplete
                setPermission={setValue}
                label={t("Permissions")}
                {...register("permission_ids")}
                error={errors.permission_ids?.message}
                helperText={errors.permission_ids?.message || ""}
                onChange={() => clearErrors("permission_ids")}
                id={data?.permissions?.id}
                permissions={data?.permissions}
              />
            </DialogContent>
            {details.map((item, index) => (
              <Box key={index}>
                <DialogContent
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  <Box sx={{ margin: "0 0 8px 5px" }}>
                    <Typography sx={{ color: "origin.main" }}>
                      {item.head}
                    </Typography>
                  </Box>
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
                </DialogContent>
              </Box>
            ))}
          </Box>
        )}
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

export default RoleUpdate;
