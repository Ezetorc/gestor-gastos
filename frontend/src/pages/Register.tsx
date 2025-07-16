import { FormRegister } from "@/components/forms/register/FormRegister";
import { theme } from "@/constants/theme";
import { Box } from "@mui/material";

const Register = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(to bottom right, ${theme.colors.gradientStart}, ${theme.colors.gradientEnd})`,
      }}
    >
      <FormRegister />
    </Box>
  );
};

export default Register;
