import { TransactionType } from "@prisma/client";
import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    version: "v1.0.0",
    title: "Gestor de gastos API",
    description: "API for managing incomes and expenses",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Local server for development",
    },
  ],
  components: {
    schemas: {
      Transaction: {
        type: "object",
        required: [
          "id",
          "amount",
          "date",
          "category",
          "paymentMethod",
          "description",
          "type",
        ],
        properties: {
          id: { type: "integer", example: 1 },
          amount: { type: "integer", example: 5000 },
          date: {
            type: "string",
            format: "date-time",
            example: "2024-07-27T12:00:00Z",
          },
          category: { type: "string", example: "Food" },
          paymentMethod: { type: "string", example: "Cash" },
          description: { type: "string", example: "Supermarket" },
          type: { enum: TransactionType, example: "INCOME" },
        },
      },
      LoginDto: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: { type: "string", example: "tu@email.com" },
          password: { type: "string", example: "tuContraSEÑA123!" },
        },
      },

      User: {
        type: "object",
        required: ["id", "name", "email"],
        properties: {
          id: { type: "integer", example: 1 },
          name: { type: "string", example: "Mabel" },
          email: { type: "string", example: "mabel@example.com" },
        },
      },
    },
  },
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./src/routers/*.ts"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
