import { FormLogin } from "@/modules/auth/components/FormLogin/FormLogin";
import { Box, type SxProps, type Theme } from "@mui/material";

const containerSx: SxProps<Theme> = (theme) => ({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: `linear-gradient(to bottom right, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
});

const Login = () => {
  return (
    <Box sx={containerSx}>
      <FormLogin />
    </Box>
  );
};

export default Login;
