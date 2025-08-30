import { FormRegister } from "@/modules/auth/components/FormRegister/FormRegister";
import { Box, type SxProps, type Theme } from "@mui/material";

const containerSx: SxProps<Theme> = (theme) => ({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: `linear-gradient(to bottom right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
});

const Register = () => {
  return (
    <Box sx={containerSx}>
      <FormRegister />
    </Box>
  );
};

export default Register;
