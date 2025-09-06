import * as yup from "yup";

export const incomeSchema = yup.object({
  typeTransaccion: yup.string().default("ingreso"),
  amount: yup
    .number()
    .typeError("El monto debe ser un número")
    .positive("El monto debe ser mayor a 0")
    .min(1, "El monto mínimo es 1")
    .required("El monto es obligatorio"),
  date: yup.date().required("La fecha es obligatoria"),
  category: yup.string().required("Selecciona una categoría"),
  description: yup
    .string()
    .max(200, "La descripción maxima es de 200 caracteres")
    .required("Descripción requerida"),
});
