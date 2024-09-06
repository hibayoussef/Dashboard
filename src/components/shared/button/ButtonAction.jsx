import { Button } from "@mui/material";
import { Box } from "@mui/system";

const ButtonAction = ({
  name,
  onClick,
  startIcon,
  type,
  endIcon,
  disabled,
}) => {
  return (
    <Box>
      <Button
        startIcon={startIcon}
        endIcon={endIcon}
        type={type}
        disabled={disabled}
        sx={{
          color: "#fff",
          backgroundColor: "origin.main",
          "&:hover": { backgroundColor: "origin.hover" },
        }}
        variant="outlined"
        onClick={onClick}
      >
        {name}
      </Button>
    </Box>
  );
};

export default ButtonAction;
