import { CorsOptions } from "cors";

export const CORS_CONFIGURATION: CorsOptions = {
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true,
};
