import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup
    .string()
    .email("Email inválido")
    .required("El email es obligatorio"),

  password: yup
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .required("La contraseña es obligatoria"),
});
