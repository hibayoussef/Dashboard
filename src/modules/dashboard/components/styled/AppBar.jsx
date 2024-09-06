import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import { drawerWidth } from "modules/dashboard/DashboardComponent";

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  backgroundColor: theme.palette.background.paper,
  backdropFilter: "blur(21px)",
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin", "left"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),

  boxShadow:
    theme.palette.mode === "dark"
      ? "rgb(255 255 255 / 10%) 0px 0px 2px 0px, rgb(255 255 255 / 12%) 0px 12px 24px -4px"
      : "rgb(145 158 171 / 20%) 0px 0px 2px 0px, rgb(145 158 171 / 52%) 0px 12px 24px -4px",

  ...(open && {
    left: "3.8%",
    marginLeft: drawerWidth,
    borderRadius: "10px",
    marginTop: "20px",
    width: `calc(92% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin", "left"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),

    [theme.breakpoints.down("md")]: {
      left: 0,
      marginLeft: 0,
      borderRadius: 0,
      marginTop: 0,
      width: "100%",
    },
  }),
}));
