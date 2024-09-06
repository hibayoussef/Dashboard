import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import IconButton from "@mui/material/IconButton";
import Vector from "assets/images/Vector.svg";
import { memo, useMemo } from "react";
import { DrawerHeader } from "../styled/DrawerHeader";

import { Box, useTheme } from "@mui/material";
import RenderLogo from "./RenderLogo";

const SideBarHeader = ({ setOpen, open, hoverd }) => {
  const theme = useTheme();
  const toggleOpen = () => setOpen((prevState) => !prevState);

  const arrowAnim = useMemo(
    () => ({
      "&.MuiSvgIcon-root path:first-of-type": {
        color: "darkGray.main",
        opacity: "0.48",
      },
      "&.MuiSvgIcon-root path:nth-of-type(2)": {
        color: "darkGray.main",
      },
      transition: "0.1s",
    }),
    []
  );

  return (
    <DrawerHeader
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",

        marginTop: "10px",
      }}
    >
      {open || hoverd ? (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            transition: "0.8s ease",
            animationDelay: "500ms",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            paddingInlineEnd: 4,
          }}
        >
          <RenderLogo />
        </Box>
      ) : (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            background: `url('${Vector}')`,
            backgroundRepeat: "no-repeat",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            // backgroundSize: "contain",
            mt: 3,
            ml: 1.5,
          }}
        ></Box>
      )}
      {(open || hoverd) && (
        <IconButton onClick={toggleOpen}>
          {theme.direction === "rtl" ? (
            <KeyboardDoubleArrowRightIcon
              sx={{
                ...arrowAnim,
                transform: !open ? "rotate(180deg)" : "none",
              }}
            />
          ) : (
            <KeyboardDoubleArrowLeftIcon
              sx={{
                ...arrowAnim,
                transform: !open ? "rotate(180deg)" : "none",
              }}
            />
          )}
        </IconButton>
      )}
    </DrawerHeader>
  );
};

export default memo(SideBarHeader);
