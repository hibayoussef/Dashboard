import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Footer = ({ open }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        color: "blue",
        marginInlineStart: open ? { xs: 5, md: 44 } : 20,
        marginInlineEnd: 10,
        display: "flex",
        justifyContent: "space-between",
        py: 2,
      }}
    >
      {/* <Link to="/dashboard/system-informations/terms-and-conditions">
        <Typography>Terms and conditions</Typography>
      </Link> */}
      <Link
        style={{ color: theme.palette.origin.hover }}
        to="/dashboard/system-informations/about-us"
      >
        <Typography>About us</Typography>
      </Link>
      <Link
        style={{ color: theme.palette.origin.hover }}
        to="/dashboard/system-informations/privacy-policy"
      >
        <Typography>Privacy and policy</Typography>
      </Link>
    </Box>
  );
};

export default Footer;
