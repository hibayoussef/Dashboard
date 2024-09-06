import { Box, InputAdornment, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ButtonLoader from "components/shared/button/ButtonLoader";
import Loader from "components/shared/Loader";
import SwitchComponent from "components/shared/SwitchComponent";
import ImagesStype from "components/shared/autoComplete/ImagesStype";
import VideosType from "components/shared/autoComplete/VideosType";
import { TextFieldStyled } from "components/styled/TextField";
import { useUpdateSettings } from "./useUpdateSettings";

const UpdateSettings = ({ setUpdateProfileDialog, settings }) => {
  const {
    t,
    open,
    errors,
    details,
    loading,
    register,
    handleClose,
    handleSubmit,
    handleUpdate,
    setValue,
    clearErrors,
    handleSwitchChange,
    switchValue,
  } = useUpdateSettings({ setUpdateProfileDialog, settings });
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
          {t("Update profile")}
        </DialogTitle>
        <Box component="form">
          <DialogContent
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Typography sx={{ color: "origin.main" }}>
              {"News bar status"}
            </Typography>
            <SwitchComponent
              notActive="No"
              active="Yes"
              register={register("news_bar_status")}
              checked={switchValue}
              onChange={handleSwitchChange}
              defaultChecked={
                settings.data.news_bar_status === "true" ? "1" : "0"
              }
            />
            {/* <FormGroup sx={{ color: "text.main" }}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography>No</Typography>
                <AntSwitch
                  {...register("news_bar_status")}
                  error={errors.news_bar_status?.message}
                  helperText={errors.news_bar_status?.message || ""}
                  checked={switchValue}
                  onChange={handleSwitchChange}
                  defaultChecked={
                    settings.data.news_bar_status === "true" ? "1" : "0"
                  }
                  inputProps={{ "aria-label": "ant design" }}
                />
                <Typography>Yes</Typography>
              </Stack>
            </FormGroup> */}
          </DialogContent>
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
                  type={item.type}
                  placeholder={item.placeholder}
                  defaultValue={item.defaultValue}
                  name={item.name}
                  {...register(item.register)}
                  error={errors[item.error]?.message}
                  helperText={errors[item.helperText]?.message || ""}
                  onKeyPress={(e) => {
                    if (item.type === "tel") {
                      const isNumericInput = /^[0-9]*$/;
                      const isNumericKey = isNumericInput.test(e.key);

                      if (!isNumericKey) {
                        e.preventDefault();
                      }
                    }
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Typography>MB</Typography>
                      </InputAdornment>
                    ),
                  }}
                />
              </DialogContent>
            </Box>
          ))}
          <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
            <ImagesStype
              setImagetypes={setValue}
              label={t("Images Type")}
              {...register("image_types")}
              error={errors.image_types?.message}
              helperText={errors.image_types?.message || ""}
              onChange={() => clearErrors("image_types")}
              image_types={settings?.data?.image_types}
            />
          </DialogContent>
          <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
            <VideosType
              setVideotypes={setValue}
              label={t("Video Type")}
              {...register("video_types")}
              error={errors.video_types?.message}
              helperText={errors.video_types?.message || ""}
              onChange={() => clearErrors("video_types")}
              video_types={settings?.data?.video_types}
            />
          </DialogContent>

          <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
            {/* <NewsStatus
              setNewsStatus={setValue}
              label={t("New status bar")}
              {...register("news_bar_status")}
              error={errors.news_bar_status?.message}
              helperText={errors.news_bar_status?.message || ""}
              onChange={() => clearErrors("news_bar_status")}
              name={settings.data.news_bar_status === true ? "Yes" : "No"}
            /> */}
          </DialogContent>
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

export default UpdateSettings;
