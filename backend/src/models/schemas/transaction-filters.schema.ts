import { TransactionType } from "@prisma/client";
import Joi from "joi";

export const transactionFiltersSchema = Joi.object({
  fromDate: Joi.date().iso().optional(),
  toDate: Joi.date().iso().optional(),
  category: Joi.string().optional(),
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  type: Joi.alternatives()
    .try(
      Joi.string().valid(...Object.values(TransactionType)),
      Joi.array().items(Joi.string().valid(...Object.values(TransactionType)))
    )
    .optional(),
  amount: Joi.number().optional(),
  amountMin: Joi.number().optional(),
  amountMax: Joi.number().optional(),
  paymethod: Joi.string().optional(),
}).unknown(true);
