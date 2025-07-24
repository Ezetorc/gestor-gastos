process.loadEnvFile();
const ENV = process.env;

export const PORT: number = ENV.PORT ? Number(ENV.PORT) : 3000;
export const JWT_SECRET: string = ENV.JWT_SECRET ? ENV.JWT_SECRET : "jwt_secret"