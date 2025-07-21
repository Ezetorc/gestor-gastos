import express, { json as jsonMiddleware } from "express";
import { ExpenseRouter } from "./routers/expense.router";
import { AuthRouter } from "./routers/auth.router";
import { PORT } from "./configuration/env.configuration";

export const app = express();

app
  .disable("x-powered-by")
  .use(jsonMiddleware())
  .use("/expenses", ExpenseRouter)
  .use("/auth", AuthRouter)
  .listen(PORT, () => console.log("✅ API is active"));
