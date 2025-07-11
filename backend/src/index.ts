import express, { json as jsonMiddleware } from 'express'
import { PORT } from './settings'
import { ExpenseRouter } from './routers/expense.router'

const app = express()

app
  .disable('x-powered-by')
  .use(jsonMiddleware())
  .use('/expenses', ExpenseRouter)
  .listen(PORT, () => console.log('✅ API is active'))
