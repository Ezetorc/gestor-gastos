import * as yup from "yup";
import type { expenseSchema } from "../schemas/expense.schema";

export type FormValuesExpense = yup.InferType<typeof expenseSchema>;
