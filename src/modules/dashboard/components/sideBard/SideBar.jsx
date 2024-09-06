import { Box } from "@mui/material";
import { useLinks } from "modules/dashboard/useLinks";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { settingsStore } from "store/settingsStore";
import { Drawer } from "../styled/Drawer";
import SideBarHeader from "./SideBarHeader";
import SideBarLink from "./SideBarLink";

const SideBar = ({ open, setOpen }) => {
  const { links } = useLinks();
  const { t } = useTranslation("sidebar");
  const [hoverd, setHoverd] = useState(false);
  const [mode] = settingsStore((state) => [state.mode]);
  const [openList, setOpenList] = useState(false);
  const handleMouseEnter = () => {
    setHoverd(true);
  };
  const handleMouseLeave = () => {
    setHoverd(false);
  };
  return (
    <Drawer
      variant="permanent"
      open={open}
      hoverd={hoverd ? "true" : ""}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        "& .MuiDrawer-paper": {
          backgroundColor: "background.sidebar",
          backdropFilter: "blur(6px)",
          borderRight: " 1px dashed rgba(99, 108, 117, 0.24)",
          boxShadow:
            mode === "dark"
              ? "rgb(255 255 255 / 10%) 0px 0px 2px 0px, rgb(255 255 255 / 12%) 0px 12px 24px -4px"
              : "rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 52%) 0px 12px 24px -4px",
        },
      }}
    >
      <SideBarHeader
        open={open}
        setOpen={setOpen}
        hoverd={hoverd ? "true" : ""}
      />
      <Box
        sx={{
          padding: "0 16px",
          display: "flex",
          flexDirection: "column",
          rowGap: "4px",
          marginTop: "20px",
          maxHeight: "100%",
          overflowY: "scroll",
        }}
        className="sideBar"
      >
        {links.map((link, index) => (
          <NavLink to={link.link} key={index}>
            {({ isActive }) => (
              <SideBarLink
                key={index}
                text={t(link.name)}
                icon={link.icon}
                open={open || hoverd}
                hoverd={hoverd}
                openList={openList}
                setOpenList={setOpenList}
                list={link.list}
                onClick={() => {}}
                active={link?.list ? false : isActive}
              />
            )}
          </NavLink>
        ))}
      </Box>
    </Drawer>
  );
};

export default SideBar;
