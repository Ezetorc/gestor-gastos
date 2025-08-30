import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { loginSchema } from "@/modules/auth/schemas/login.schema";
import type { LoginFormData } from "@/modules/auth/types/login.type";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import {
  buttonSubmitSx,
  formSx,
  headerBoxSx,
  iconWrapperSx,
  inputSx,
  mutedTextSx,
} from "./FormLogin.styles";

export function FormLogin() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const { login, error } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: LoginFormData) => {
    const usuario = {
      id: "a",
      nombre: "pedro",
      email: data.email,
    };
    login(usuario);
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={formSx}
    >
      <Box sx={headerBoxSx}>
        <Box sx={iconWrapperSx}>
          <AccessibilityIcon
            sx={(theme) => ({
              fontSize: 35,
              color: theme.palette.background.paper,
            })}
          />
        </Box>
        <Typography
          variant="h5"
          color="white"
          fontWeight="bold"
          textAlign="center"
          component="h1"
        >
          Iniciar Sesión
        </Typography>
        <Typography sx={mutedTextSx}>Accede a tu cuenta de gastos</Typography>
      </Box>

      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            margin="dense"
            fullWidth
            label="Email"
            variant="outlined"
            {...field}
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={inputSx}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            margin="dense"
            fullWidth
            type={showPassword ? "text" : "password"}
            label="Contraseña"
            variant="outlined"
            {...field}
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={inputSx}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {/*<Icon name={showPassword ? "visibilityOff" : "visibility"} />*/}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      />

      {error && (
        <Typography color="error" align="center" mt={1}>
          {error}
        </Typography>
      )}

      <Button type="submit" variant="contained" sx={buttonSubmitSx}>
        Iniciar Sesión
      </Button>

      <Typography sx={mutedTextSx}>
        ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
      </Typography>
    </Box>
  );
}
