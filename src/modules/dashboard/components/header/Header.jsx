import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationAddIcon from "@mui/icons-material/NotificationAdd";
import { Box, IconButton, Toolbar, Tooltip } from "@mui/material";
import Loader from "components/shared/Loader";
import { usePermissions } from "hooks/usePermissions";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useProfile } from "services/profile/useProfile";
import { useSystemSetting } from "services/system_setting/useSystemSetting";
import { settingsStore } from "store/settingsStore";
import SideBarResponsive from "../sideBard/SideBarResponsive";
import { AppBar } from "../styled/AppBar";
import ProfileMenu from "./ProfileMenu";
import SettingsMenu from "./SettingsMenu";
const Header = ({ open }) => {
  const { data, isLoading } = useProfile();
  const { data: settings, isLoading: SettingLodaing } = useSystemSetting();
  const { permissions } = usePermissions();

  const { i18n } = useTranslation("header");
  const navigate = useNavigate();
  const [setMode, mode] = settingsStore((state) => [state.setMode, state.mode]);
  const [openResBar, setOpenResBar] = useState(false);
  const [direction, setDirection] = settingsStore((state) => [
    state.direction,
    state.setDirection,
  ]);

  const toggleLang = () => {
    setDirection(direction === "ltr" ? "rtl" : "ltr");
    i18n.changeLanguage(direction === "ltr" ? "ar" : "en");
  };

  return (
    <>
      {(isLoading || SettingLodaing) && <Loader />}

      <AppBar position="fixed" open={open}>
        <Box
          sx={{
            display: { md: "none" },
          }}
        >
          {openResBar && (
            <SideBarResponsive
              openResBar={openResBar}
              setOpenResBar={setOpenResBar}
              direction={direction}
              mode={mode}
              open={open}
            />
          )}
        </Box>
        <Toolbar
          sx={{
            width: "100%",
            display: "flex",
            gap: 2,
            justifyContent: "flex-end",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              left: direction === "ltr" ? 0 : 0,
              paddingX: "20px",
              display: { xs: "flex", md: "none" },
              alignItems: "center",
            }}
          >
            <MenuIcon
              sx={{ color: mode === "dark" ? "#637381" : "#919EAB" }}
              onClick={() => setOpenResBar(!openResBar)}
            />
          </Box>
          {/* <IconButton onClick={toggleLang}>
          <Tooltip
            title={
              direction === "ltr" ? t("arabic language") : t("english language")
            }
          >
            <TranslateIcon
              sx={{ color: mode === "dark" ? "#637381" : "#919EAB" }}
            />
          </Tooltip>
        </IconButton> */}
          <IconButton
            onClick={() => setMode(mode === "dark" ? "light" : "dark")}
            sx={{
              color: "darkGray.main",
            }}
          >
            <Tooltip title={mode === "dark" ? "light mode" : "dark mode"}>
              {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
            </Tooltip>
          </IconButton>
          {permissions?.Notification?.Create === true ? (
            <IconButton
              onClick={() => navigate("/dashboard/notifications")}
              sx={{
                color: "darkGray.main",
              }}
            >
              <Tooltip title={"Add notifications"}>
                <NotificationAddIcon />
              </Tooltip>
            </IconButton>
          ) : null}
          {permissions?.System_Setting?.All === true ? (
            <IconButton>
              <SettingsMenu settings={settings} permissions={permissions} />
            </IconButton>
          ) : null}
          <ProfileMenu data={data} />
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
