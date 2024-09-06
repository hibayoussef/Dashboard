import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Collapse, Typography } from "@mui/material";
import { memo } from "react";
import { NavLink } from "react-router-dom";
import { ButtonSideBarStyled } from "../styled/ButtonSideBarStyled";

const SideBarLink = (props) => {
  const handleClick = () => {
    props.setOpenList((prevOpenList) =>
      prevOpenList === props.text ? "" : props.text
    );
  };

  if (props.icon)
    return (
      <>
        <ButtonSideBarStyled
          variant="contained"
          startIcon={props.icon}
          fullWidth
          active={props.active}
          onClick={props.list ? handleClick : props.onClick}
          openResBar={props.openResBar}
        >
          <Typography
            variant="body1"
            sx={{
              textDecoration: "none",
              opacity: props.open ? 1 : 0,
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {props.text}
            {props.list ? (
              props.openList === props.text ? (
                <ExpandLessIcon />
              ) : (
                <ExpandMoreIcon />
              )
            ) : null}
          </Typography>
        </ButtonSideBarStyled>

        {props.list && (
          <Collapse
            in={props.openList === props.text}
            timeout="auto"
            unmountOnExit
          >
            <Box sx={{ pl: 1, mt: 1 }}>
              {props.list.map((item, index) => (
                <NavLink to={item.link} key={index}>
                  {({ isActive }) => (
                    <ButtonSideBarStyled
                      variant="contained"
                      startIcon={item.icon}
                      fullWidth
                      active={isActive}
                      sx={{ mt: 0.5 }}
                    >
                      {item.name}
                    </ButtonSideBarStyled>
                  )}
                </NavLink>
              ))}
            </Box>
          </Collapse>
        )}
      </>
    );

  return (
    <ButtonSideBarStyled variant="contained" fullWidth active={props.active}>
      <Typography variant="body1">{props.text}</Typography>
    </ButtonSideBarStyled>
  );
};

export default memo(SideBarLink);
