import * as yup from "yup";
import type { incomeSchema } from "../schemas/income.schema";

export type FormValuesIncome = yup.InferType<typeof incomeSchema>;
