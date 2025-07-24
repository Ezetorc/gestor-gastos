import express, { json as jsonMiddleware } from "express";
import { ExpenseRouter } from "./routers/expense.router";
import errorHandlerMiddleware from "./middlewares/error-handler.middleware";
import { PORT } from "./configuration/env.configuration";
import authRouter from './routers/auth.router';

export const app = express();
app
.disable("x-powered-by")
.use(jsonMiddleware())
.use("/expenses", ExpenseRouter)
.use(errorHandlerMiddleware)
.listen(PORT, () => console.log("✅ API is active"));

app.use('/auth', authRouter);