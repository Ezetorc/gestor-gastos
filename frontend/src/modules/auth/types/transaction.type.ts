import * as yup from "yup";
import type { transactionSchema } from "../schemas/transaction.schema";

export type FormValues = yup.InferType<typeof transactionSchema>;
