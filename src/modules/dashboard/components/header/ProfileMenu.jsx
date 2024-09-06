import {
  Avatar,
  Box,
  Button,
  Divider,
  Menu,
  Tooltip,
  Typography,
} from "@mui/material";
import * as React from "react";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { _AuthApi } from "services/auth/auth.service";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import ChangePassword from "./change-pasword/ChangePassword";
import UpdateProfile from "./update-profile/UpdateProfile";

const ProfileMenu = ({ data }) => {
  const { t } = useTranslation("navbar");
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState();
  const [changePasswordDialog, setChangePasswordDialog] = React.useState(false);
  const [updateProfileDialog, setUpdateProfileDialog] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = (input) => {
    _AuthApi.destroyToken(input);
    navigate("/");
  };
  return (
    <React.Fragment>
      {changePasswordDialog && (
        <ChangePassword
          setChangePasswordDialog={setChangePasswordDialog}
          changePasswordDialog={changePasswordDialog}
        />
      )}
      {updateProfileDialog && (
        <UpdateProfile
          updateProfileDialog={updateProfileDialog}
          setUpdateProfileDialog={setUpdateProfileDialog}
          data={data}
        />
      )}
      {!!data && (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              border: "2px solid",
              borderColor: "borderColor.main",
              borderRadius: "50%",
              width: "43px",
              height: "43px",
            }}
          >
            <Tooltip title={"account settings"}>
              <Avatar
                // src={meProfile?.photo?.file?.url}
                sx={{ width: 35, height: 35, cursor: "pointer" }}
                onClick={handleClick}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
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
                  {data?.data?.full_name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ textDecoration: "none", color: "darkGray.main" }}
                >
                  {data?.data?.roles?.map((item) => item.name)}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ textDecoration: "none", color: "darkGray.main" }}
                >
                  {data?.data?.email}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ textDecoration: "none", color: "darkGray.main" }}
                >
                  {data?.data?.phone}
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ my: "15px" }} />
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Button
                variant="default"
                fullWidth
                startIcon={
                  <LockOpenIcon sx={{ color: "text.main", fontSize: "24px" }} />
                }
                onClick={() => setChangePasswordDialog(!changePasswordDialog)}
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  display: "flex",
                  justifyContent: "start",
                  color: "text.main",
                }}
              >
                {t("Change password")}
              </Button>

              <Button
                variant="default"
                fullWidth
                startIcon={
                  <PersonOutlineOutlinedIcon
                    sx={{ color: "text.main", fontSize: "24px" }}
                  />
                }
                sx={{
                  fontSize: "14px",
                  fontWeight: "400",
                  display: "flex",
                  justifyContent: "start",
                  color: "text.main",
                }}
                onClick={() => setUpdateProfileDialog(!updateProfileDialog)}
              >
                {t("Update profile")}
              </Button>
            </Box>
            <Button
              variant="error"
              sx={{
                width: "100%",
                py: "7px",
                mt: "20px",
              }}
              onClick={() => handleLogout()}
            >
              Logout
            </Button>
          </Menu>
        </>
      )}
    </React.Fragment>
  );
};

export default React.memo(ProfileMenu);
