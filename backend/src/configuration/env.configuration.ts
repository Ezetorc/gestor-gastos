import Joi from 'joi';
process.loadEnvFile();

const envValidation = Joi.object({
  PORT: Joi.number().default(3000),
  JWT_SECRET: Joi.string().required(),
  DATABASE_URL: Joi.string().uri().required()
})


const { error, value: envVars } = envValidation.validate(process.env, {
  allowUnknown: true,
  abortEarly: false
})

if (error) {
  throw new Error(`Configuration error: ${error.message}`)
}

export const PORT: number = envVars.PORT
export const JWT_SECRET: string = envVars.JWT_SECRET
export const DATABASE_URL: string = envVars.DATABASE_URL

