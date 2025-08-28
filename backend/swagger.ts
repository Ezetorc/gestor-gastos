import { TransactionType } from "@prisma/client";
import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    version: "v1.0.0",
    title: "Gestor de gastos API",
    description: "API para gestionar ingresos y gastos",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Servidor local para desarrollo",
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
          category: { type: "string", example: "Alimentación" },
          paymentMethod: { type: "string", example: "Efectivo" },
          description: { type: "string", example: "Compra supermercado" },
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
    },
  },
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./src/routers/*.ts"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc).then(
  () => {
    console.log("Swagger generado.");
  }
);
