import { Box, Button, Divider, Menu, Tooltip, Typography } from "@mui/material";
import * as React from "react";

import SettingsIcon from "@mui/icons-material/Settings";
import { useTranslation } from "react-i18next";
import UpdateSettings from "./update-settings/UpdateSettings";

const SettingsMenu = ({ settings, permissions }) => {
  const { t } = useTranslation("navbar");
  //   const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState();
  const [updateProfileDialog, setUpdateProfileDialog] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      {updateProfileDialog && (
        <UpdateSettings
          updateProfileDialog={updateProfileDialog}
          setUpdateProfileDialog={setUpdateProfileDialog}
          settings={settings}
        />
      )}
      {!!settings && (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              borderRadius: "50%",
            }}
          >
            <Tooltip title={"System settings"}>
              <SettingsIcon
                sx={{ width: 25, height: 25, color: "darkGray.main" }}
                onClick={handleClick}
                aria-controls={open ? "account-menu" : undefined}
                aria-expanded={open ? "true" : undefined}
              />
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            disableScrollLock
            PaperProps={{
              elevation: 0,
              sx: {
                padding: "10px",
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                bgcolor: "card.main",
                minWidth: "200px",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "card.main",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <Box
              sx={{
                cursor: "default",
                backgroundColor: "inherit",
                color: "textColor.100",
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                columnGap: "10px",
                padding: "0px 10px 0px 10px",
                borderRadius: "14px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ textDecoration: "none", color: "darkGray.main" }}
                >
                  Image types:{" "}
                  {settings?.data?.image_types?.length > 0
                    ? settings?.data?.image_types
                        ?.map((item) => item)
                        .join(", ")
                    : "N/A"}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ textDecoration: "none", color: "darkGray.main" }}
                >
                  Video types:{" "}
                  {settings?.data?.video_types.length > 0
                    ? settings?.data?.video_types
                        ?.map((item) => item)
                        .join(", ")
                    : "N/A"}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ textDecoration: "none", color: "darkGray.main" }}
                >
                  Max image size: {settings?.data?.max_image_size ?? "N/A"} MB
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ textDecoration: "none", color: "darkGray.main" }}
                >
                  Max pdf size: {settings?.data?.max_pdf_size ?? "N/A"} MB
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ textDecoration: "none", color: "darkGray.main" }}
                >
                  Max video size: {settings?.data?.max_video_size ?? "N/A"} MB
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ textDecoration: "none", color: "darkGray.main" }}
                >
                  News bar status:{" "}
                  {settings?.data?.news_bar_status === true
                    ? "Showen"
                    : "Not showen" ?? "N/A"}
                </Typography>
              </Box>
            </Box>
            {permissions?.System_Setting?.Update === true ? (
              <>
                <Divider sx={{ my: "15px" }} />
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Button
                    variant="default"
                    fullWidth
                    startIcon={
                      <SettingsIcon
                        sx={{ color: "text.main", fontSize: "24px" }}
                      />
                    }
                    sx={{
                      fontSize: "16px",
                      fontWeight: "400",
                      display: "flex",
                      justifyContent: "start",
                      color: "text.main",
                    }}
                    onClick={() => setUpdateProfileDialog(!updateProfileDialog)}
                  >
                    {t("Update settings")}
                  </Button>
                </Box>
              </>
            ) : null}
          </Menu>
        </>
      )}
    </React.Fragment>
  );
};

export default React.memo(SettingsMenu);
