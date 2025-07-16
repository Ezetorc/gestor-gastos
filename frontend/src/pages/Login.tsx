import { Link } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import Icon from "@/components/Icon";

const Login = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        maxWidth: 400,
        margin: "auto",
        padding: 4,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Icon name="login" size={40} />
      <Typography variant="h5" component="h1">
        Iniciar Sesión
      </Typography>
      <Typography variant="body1">Accede a tu cuenta de gastos</Typography>
      <TextField id="email" label="Email" variant="outlined" fullWidth />
      <TextField
        id="password"
        label="Contraseña"
        type="password"
        variant="outlined"
        fullWidth
      />
      <Button variant="contained" fullWidth>
        Iniciar Sesión
      </Button>
      <Typography variant="body2">
        ¿No tienes cuenta?{" "}
        <Link to="/register" style={{ textDecoration: "none" }}>
          Regístrate
        </Link>
      </Typography>
    </Box>
  );
};

export default Login;