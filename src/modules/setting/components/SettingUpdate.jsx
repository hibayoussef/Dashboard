import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ButtonLoader from "components/shared/button/ButtonLoader";
import Loader from "components/shared/Loader";
import TextEditor from "components/shared/TextEditor";
import { TextFieldStyled } from "components/styled/TextField";
import { useSettingUpdate } from "../hooks/useSettingUpdate";

const SettingUpdate = ({ id, settingName }) => {
  const {
    t,
    open,
    data,
    loading,
    isLoading,
    handleSubmit,
    handleUpdate,
    handleClose,
    contentArabic,
    setContentArabic,
    details,
    errors,
  } = useSettingUpdate({ settingName });

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
            {settingName === "term_of_use" ||
            settingName === "privacy_policy" ? (
              <DialogContent
                sx={{ display: "flex", gap: 1, flexDirection: "column" }}
              >
                <TextEditor
                  title={t("settings.value")}
                  value={contentArabic}
                  setValue={setContentArabic}
                />
              </DialogContent>
            ) : (
              <DialogContent>
                {details.map((item, index) => (
                  <Box key={index}>
                    <DialogContent
                      sx={{ display: "flex", gap: 1, flexDirection: "column" }}
                    >
                      <Box sx={{ margin: "0 0 8px 5px" }}>
                        <Typography sx={{ color: "origin.main" }}>
                          {item.head}
                        </Typography>
                      </Box>
                      <TextFieldStyled
                        sx={{ width: "100%", my: "5px" }}
                        type={item.type}
                        placeholder={item.placeholder}
                        value={contentArabic}
                        onChange={(e) => setContentArabic(e.target.value)}
                        name={item.name}
                        error={errors[item.error]?.message}
                        helperText={errors[item.helperText]?.message || ""}
                      />
                    </DialogContent>
                  </Box>
                ))}
              </DialogContent>
            )}
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

export default SettingUpdate;
