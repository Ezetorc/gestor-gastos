import { yupResolver } from "@hookform/resolvers/yup";
import Icon from "@/components/Icon";
import { theme } from "@/constants/theme";
import { registerSchema } from "@/schemas/register.schema";
import { buttonSubmit, formStyle, inputStyles } from "@/styles/formsStyles";
import type { RegisterFormData } from "@/types/register.type";
import { Controller, useForm } from "react-hook-form";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export function FormRegister() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  });

  const { register, error } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: RegisterFormData) => {
    const usuario = {
      id: "a",
      nombre: data.name,
      email: data.email,
    };
    // esto cambia cuando usemos backend
    register(usuario);
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={formStyle}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Box
          mb={2}
          sx={{
            display: "grid",
            placeContent: "center",
            width: "60px",
            height: "60px",
            borderRadius: "100%",
            background: theme.colors.primary,
          }}
        >
          <Icon name="register" size={30} />
        </Box>
        <Typography
          variant="h5"
          color="white"
          fontWeight="bold"
          textAlign="center"
        >
          Crear Cuenta
        </Typography>
        <Typography color={theme.colors.muted} textAlign="center">
          Unite y gestiona tus gastos
        </Typography>
      </Box>
      <Controller
        name="name"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            margin="dense"
            fullWidth
            label="Nombre completo"
            variant="outlined"
            {...field}
            error={!!errors.name}
            helperText={errors.name?.message}
            sx={inputStyles.root}
          />
        )}
      />
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
            margin="dense"
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
                      edge="end"
                    >
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

      <Controller
        name="confirmPassword"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            margin="dense"
            fullWidth
            type={showPassword ? "text" : "password"}
            label="Confirmar contraseña"
            variant="outlined"
            {...field}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            sx={inputStyles.root}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
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
        Crear Cuenta
      </Button>

      <Typography align="center" color={theme.colors.muted}>
        ¿ya tenes tu cuenta?
        <Link to="/login"> Inicia Sesion</Link>
      </Typography>
    </Box>
  );
}
