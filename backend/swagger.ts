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
        id: 1,
        amount: 5000,
        date: "2024-07-27T12:00:00Z",
        category: "Food",
        paymentMethod: "Cash",
        description: "Supermarket",
        type: "INCOME",
      },

      LoginDto: {
        email: "tu@email.com",
        password: "tuContraSEÑA123!",
      },

      User: {
        id: 1,
        name: "Mabel",
        email: "mabel@example.com",
      },
    },
  },
};

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./src/routers/*.ts"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
