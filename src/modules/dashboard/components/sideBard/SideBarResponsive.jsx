import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { useLinks } from "modules/dashboard/useLinks";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import SideBarLink from "../sideBard/SideBarLink";
import { Drawer } from "../styled/Drawer";
const SideBarResponsive = ({
  mode,
  open,
  direction,
  openResBar,
  setOpenResBar,
}) => {
  const { links } = useLinks();
  const { t } = useTranslation("sidebar");
  const [openList, setOpenList] = useState(false);
  const [hoverd, setHoverd] = useState(false);
  const handleMouseEnter = () => {
    setHoverd(true);
  };
  const handleMouseLeave = () => {
    setHoverd(false);
  };

  const boxVariants = {
    open: {
      width: 270,
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
    closed: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <>
      <motion.div
        initial="closed"
        animate={openResBar ? "open" : "closed"}
        variants={boxVariants}
        style={{
          position: "absolute",
          left: direction === "ltr" ? 0 : 200,
          top: 57,
          backgroundColor: mode === "dark" ? "#1E1E1E" : "white",
          width: 270,
          height: "100vh",
          backdropFilter: "blur(6px)",
          borderRight: " 1px dashed rgba(99, 108, 117, 0.24)",
          boxShadow:
            mode === "dark"
              ? "rgb(255 255 255 / 10%) 0px 0px 2px 0px, rgb(255 255 255 / 12%) 0px 12px 24px -4px"
              : "rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 52%) 0px 12px 24px -4px",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
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
      </motion.div>
    </>
  );
};

export default SideBarResponsive;
