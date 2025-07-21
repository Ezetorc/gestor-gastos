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

export function FormLogin() {
  // Hook de react-hook-form para manejar el formulario
  const {
    handleSubmit, // función que se ejecuta al enviar el formulario
    control, // se usa con Controller para conectar los inputs
    formState: { errors }, // contiene los errores de validación
  } = useForm<LoginFormData>({
    // Se le pasa un validador de Yup como resolver
    resolver: yupResolver(loginSchema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const [errorLogin, setErrorLogin] = useState<string | null>(null);

  const onSubmit = async (data: LoginFormData) => {
    // Lista simulada de usuarios registrados (esto simula una base de datos)
    const fakeUsers = [
      { email: "test@ejemplo.com", password: "123456" },
      { email: "mazal@ejemplo.com", password: "shalom123" },
    ];

    const usuarioValido = fakeUsers.find(
      (user) => user.email === data.email && user.password === data.password
    );

    if (usuarioValido) {
      console.log("¡Login exitoso!", usuarioValido);
      setErrorLogin(null);

      // 👉 Aquí podrías redirigir al usuario, guardar token, etc.
    } else {
      setErrorLogin("Email o contraseña incorrectos");
    }
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
          <Icon name="login" size={30} />
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

      {/* Campo contraseña */}
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
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    sx={{ color: "#ccc" }}
                  >
                    {showPassword ? (
                      <Icon name="visibilityOff" />
                    ) : (
                      <Icon name="visibility" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      />

      {/* Error de login */}
      {errorLogin && (
        <Typography color="error" align="center" mt={1}>
          {errorLogin}
        </Typography>
      )}

      {/* Botón de envío */}
      <Button type="submit" variant="contained" sx={buttonSubmit}>
        Iniciar Sesión
      </Button>

      {/* Link a registro */}
      <Typography align="center" color={theme.colors.muted}>
        ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
      </Typography>
    </Box>
  );
}
