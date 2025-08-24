import Joi from 'joi';
process.loadEnvFile();
const ENV = process.env;

//export const PORT: number = ENV.PORT ? Number(ENV.PORT) : 3000;
//export const JWT_SECRET: string = ENV.JWT_SECRET ? ENV.JWT_SECRET : "jwt_secret"

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

// ✅ Exportar variables 
export const PORT: number = envVars.PORT
export const JWT_SECRET: string = envVars.JWT_SECRET
export const DATABASE_URL: string = envVars.DATABASE_URL

