
import { FormLogin } from "@/components/forms/login/FormLogin";
import { theme } from "@/constants/theme";
import {Box} from "@mui/material";

const Login = () => {
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
          <FormLogin />
        </Box>

  );
};

export default Login;