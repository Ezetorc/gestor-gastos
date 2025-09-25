import * as yup from "yup";

export const expenseSchema = yup.object({
  name: yup.string().required("El nombre es requerido"),
  type: yup.string().required("El tipo de gasto es requerido"),
  amount: yup
    .number()
    .typeError("El monto debe ser un número válido")
    .positive("El monto debe ser mayor a 0")
    .min(1, "El monto mínimo es 1")
    .required("El monto es obligatorio"),
  date: yup.date().required("La fecha es obligatoria"),
  category: yup.string().required("Selecciona una categoría"),
  paymentMethod: yup.string().required("Selecciona un método de pago"),
  description: yup
    .string()
    .max(200, "La descripción maxima es de 200 caracteres")
    .required("Descripción requerida"),
});

export type FormValuesExpense = yup.InferType<typeof expenseSchema>;
