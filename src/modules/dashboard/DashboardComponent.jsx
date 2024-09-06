import { Box, Divider } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";
import SideBar from "./components/sideBard/SideBar";
import Footer from "./components/footer/Footer";

export const drawerWidth = 270;
const DashboardComponent = () => {
  const [open, setOpen] = useState(true);
  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "background.main",
        minHeight: "100vh",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Header open={open} />
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        <SideBar open={open} setOpen={setOpen} />
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginInlineStart: open ? { xs: 0, md: 33 } : 10,
        }}
      >
        <Box sx={{ marginTop: "100px", marginX: { xs: "1px", md: "50px" } }}>
          <Outlet />
        </Box>
      </Box>
      <Box>
        <Divider />

        <Footer open={open} />
      </Box>
    </Box>
  );
};

export default DashboardComponent;
