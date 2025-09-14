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
  type SxProps,
  type Theme,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { registerSchema } from "@/modules/auth/schemas/register.schema";
import type { RegisterFormData } from "@/modules/auth/types/register.type";
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { buttonSubmitSx, formSx, inputSx } from "./FormRegister.styles";

export function FormRegister() {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  });

  const { register, error } = useAuth();

  const onSubmit = (data: RegisterFormData) => {
    register(data);
  };

  const headerBoxSx: SxProps<Theme> = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    mb: 2,
  };

  const iconWrapperSx: SxProps<Theme> = {
    display: "grid",
    placeContent: "center",
    width: 60,
    height: 60,
    borderRadius: "50%",
    background: theme.palette.primary.main,
    mb: 2,
  };

  const mutedTextSx: SxProps<Theme> = {
    color: theme.palette.text.secondary,
    textAlign: "center",
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={formSx}>
      <Box sx={headerBoxSx}>
        <Box sx={iconWrapperSx}>
          <AccountCircleIcon sx={(theme)=>({fontSize:35, color: theme.palette.background.paper})}/>
        </Box>
        <Typography variant="h5" color="white" fontWeight="bold" textAlign="center">
          Crear Cuenta
        </Typography>
        <Typography sx={mutedTextSx}>Únete y gestiona tus gastos</Typography>
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
            sx={inputSx}
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
            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
             {/* <Icon name={showPassword ? "visibilityOff" : "visibility"} />*/}
            </IconButton>
          </InputAdornment>
        ),
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
      sx={inputSx}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
             {/* <Icon name={showPassword ? "visibilityOff" : "visibility"} />*/}
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
        Crear Cuenta
      </Button>

      <Typography sx={mutedTextSx}>
        ¿Ya tienes tu cuenta? <Link to="/login">Inicia Sesión</Link>
      </Typography>
    </Box>
  );
}
