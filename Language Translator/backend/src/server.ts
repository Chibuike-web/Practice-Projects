import { serve } from "@hono/node-server";
import app from "./index";

const port = 4000;
console.log(`🚀 Server is running at http://localhost:${port}`);

serve({ fetch: app.fetch, port });
