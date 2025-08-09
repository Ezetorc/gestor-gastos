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
import { formStyle, inputStyles, buttonSubmit } from "@/styles/formsStyles";
import { theme } from "@/constants/theme";
import Icon from "@/components/Icon";
import { loginSchema } from "@/schemas/login.schema";
import type { LoginFormData } from "@/types/login.type";
import { useAuth } from "@/hooks/useAuth";

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
    // cuando usemos el backend esto cambia
    login(usuario);
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={formStyle}>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Box
          mb={2}
          sx={{
            display: "grid",
            placeContent: "center",
            width: "60px",
            height: "60px",
            borderRadius: "100%",
            background: theme.colors.primary,
          }}>
          <Icon name="login" size={30} />
        </Box>
        <Typography
          variant="h5"
          color="white"
          fontWeight="bold"
          textAlign="center"
          component="h1">
          Iniciar Sesión
        </Typography>
        <Typography color={theme.colors.muted} textAlign="center">
          Accede a tu cuenta de gastos
        </Typography>
      </Box>

      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            autoComplete="current-password"
            placeholder="Email"
            margin="dense"
            fullWidth
            label="Email"
            variant="outlined"
            {...field}
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={inputStyles.root}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            placeholder="Contraseña"
            margin="dense"
            autoComplete="current-password"
            fullWidth
            type={showPassword ? "text" : "password"}
            label="Contraseña"
            variant="outlined"
            {...field}
            error={!!errors.password}
            helperText={errors.password?.message}
            sx={inputStyles.root}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end">
                      {showPassword ? (
                        <Icon name="visibilityOff" />
                      ) : (
                        <Icon name="visibility" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
        )}
      />

      {error && (
        <Typography color="error" align="center" mt={1}>
          {error}
        </Typography>
      )}

      <Button type="submit" variant="contained" sx={buttonSubmit}>
        Iniciar Sesión
      </Button>

      <Typography align="center" color={theme.colors.muted}>
        ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
      </Typography>
    </Box>
  );
}
