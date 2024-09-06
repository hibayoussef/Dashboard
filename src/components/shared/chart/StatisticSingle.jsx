import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { BoxStyled } from "components/styled/BoxStyled";

const StatisticSingle = ({ title, count, last_update, icon }) => {
  return (
    <BoxStyled
      sx={{
        height: "180px",
        display: "flex",
        flexDirection: "column",
        color: "text.main",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mb: 1,
          pl: 1,
        }}
      >
        <IconButton
          sx={{
            cursor: "not-allowed",
          }}
        >
          <Tooltip sx={{ color: "text.main" }}>{icon}</Tooltip>
        </IconButton>
        <Typography sx={{ color: "text.main" }} variant="h6">
          {title}
        </Typography>
      </Box>
      <Box
        sx={{
          px: 3,
          py: 1,
        }}
      >
        <Typography>Count: {count ? count : 0}</Typography>
        <Typography>
          Last Updated: {last_update ? last_update : "---"}
        </Typography>
      </Box>
    </BoxStyled>
  );
};

export default StatisticSingle;
