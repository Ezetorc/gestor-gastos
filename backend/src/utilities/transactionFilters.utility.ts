export interface TransactionFilters {
  fromDate?: string;
  toDate?: string;
  category?: string;
  amount?: number;
  amountMin?: number;
  amountMax?: number;
  paymentMethod?: string;
  type?: "INCOME" | "EXPENSE" | ("INCOME" | "EXPENSE")[];
  name?: string;
  description?: string;
}


// validamos tipos con joi
import Joi from "joi";

export const transactionFiltersSchema = Joi.object({
  fromDate: Joi.date().iso().optional(),
  toDate: Joi.date().iso().optional(),
  category: Joi.string().optional(),
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  type: Joi.alternatives().try(
    Joi.string().valid("INCOME","EXPENSE"),
    Joi.array().items(Joi.string().valid("INCOME","EXPENSE"))
  ).optional(),
  amount: Joi.number().optional(),
  amountMin: Joi.number().optional(),
  amountMax: Joi.number().optional(),
  paymethod:Joi.string().optional(),
});