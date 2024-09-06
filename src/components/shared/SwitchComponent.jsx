import { Stack } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import Typography from "@mui/material/Typography";
import { AntSwitch } from "components/styled/SwitcheStyled";
const SwitchComponent = ({
  register,
  defaultChecked,
  checked,
  onChange,
  notActive,
  active,
}) => {
  return (
    <>
      <FormGroup sx={{ color: "text.main" }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography>{notActive}</Typography>
          <AntSwitch
            {...register}
            checked={checked}
            onChange={onChange}
            defaultChecked={defaultChecked}
          />
          <Typography>{active}</Typography>
        </Stack>
      </FormGroup>
    </>
  );
};

export default SwitchComponent;
