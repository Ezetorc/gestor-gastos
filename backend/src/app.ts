import express, { json as jsonMiddleware } from "express";
import { ExpenseRouter } from "./routers/expense.router";

export const app = express();

app
  .disable("x-powered-by")
  .use(jsonMiddleware())
  .use("/expenses", ExpenseRouter);
