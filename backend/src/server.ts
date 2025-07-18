import { PORT } from "./configuration/env.configuration";
import { app } from "./app";

app.listen(PORT, () => console.log("✅ API is active"));
