import Joi from "joi";

export const paginationQuerySchema = Joi.object({
  page: Joi.number().default(1),
  amount: Joi.number().default(8),
}).unknown(true);
