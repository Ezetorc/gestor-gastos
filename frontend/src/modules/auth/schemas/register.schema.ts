import * as yup from "yup";

export const registerSchema = yup.object({
  name: yup.string().required("El nombre es obligatorio"),
  email: yup
    .string()
    .email("Email inválido")
    .required("El email es obligatorio"),
  password: yup
    .string()
    .min(8, "Mínimo 8 caracteres")
    .required("La contraseña es obligatoria")
    .matches(
      /^(?=.*[A-Z])(?=.*\d).+$/,
      "Debe contener al menos una mayúscula y un número"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Las contraseñas no coinciden")
    .required("Confirmar contraseña es obligatorio"),
});
