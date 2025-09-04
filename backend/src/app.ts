import cors from "cors";
import { errorHandlerMiddleware } from "./middlewares/error-handler.middleware";
import express, { json as jsonMiddleware } from "express";
import { AuthRouter } from "./routers/auth.router";
import { PORT } from "./configuration/env.configuration";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "../swagger_output.json";
import { TransactionRouter } from "./routers/transaction.router";
import { CORS_CONFIGURATION } from "./configuration/cors.configuration";

export const app = express();

app
  .disable("x-powered-by")
  .use(cors(CORS_CONFIGURATION))
  .use(jsonMiddleware())
   .use(
    cors({
      origin: `http://localhost:5173`, 
    }))
  .use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOutput))
  .use("/transactions", TransactionRouter)
  .use("/auth", AuthRouter)
  .use(errorHandlerMiddleware())
  .listen(PORT, () => console.log(`✅ API is active in port ${PORT}`));
