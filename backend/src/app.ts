import { errorHandlerMiddleware } from "./middlewares/error-handler.middleware";
import express, { json as jsonMiddleware } from "express";
import { ExpenseRouter } from "./routers/expense.router";
import { PORT } from "./configuration/env.configuration";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from '../swagger_output.json';




export const app = express();

app
  .disable("x-powered-by")
  .use(jsonMiddleware())
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput))

  .use("/expenses", ExpenseRouter)
  .use(errorHandlerMiddleware())


  .listen(PORT, () => console.log("✅ API is active"));
