process.loadEnvFile()
const ENV = process.env

export const PORT: number = ENV.PORT ? Number(ENV.PORT) : 3000
