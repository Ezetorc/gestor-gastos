import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '@/schemas/register.schema';
import { buttonSubmit, formStyle, inputStyles } from '@/styles/formsStyles';
import type { RegisterFormData } from '@/types/register.type';
import { Controller, useForm } from 'react-hook-form';
import Icon from '@/components/Icon';
import { theme } from '@/constants/theme';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export function FormLogin() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: RegisterFormData) => {
    console.log('Datos enviados:', data);
  };

  return (
    <>
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={formStyle}
    >
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Box
          mb={2}
          sx={{
            display: 'grid',
            placeContent: 'center',
            width: '60px',
            height: '60px',
            borderRadius: '100%',
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
            type={showPassword ? 'text' : 'password'}
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
                    sx={{ color: '#ccc' }}
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
      <Button type="submit" variant="contained" sx={buttonSubmit}>
       Iniciar Sesión
      </Button>

      <Typography align="center" color={theme.colors.muted}>
        ¿No tienes cuenta?{' '}
        <Link to="/register">Regístrate</Link>
      </Typography>
    </Box>
    </>
  );
}
