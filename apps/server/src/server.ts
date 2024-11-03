import {
  fastifyTRPCPlugin,
  FastifyTRPCPluginOptions,
} from "@trpc/server/adapters/fastify";
import fastify from "fastify";
import cors from "@fastify/cors";
import { createContext } from "./context";
import {
  appRouter,
  type AppRouter,
} from "@boilerplate-ts-turborepo-react-vite-tailwind-zustand-fastify-trpc-prisma/api";

const server = fastify({
  maxParamLength: 5000,
  logger: {
    level: "error",
    transport: {
      target: "pino-pretty",
    },
  },
});

// Add error handlers
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
});

server.register(cors, {
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  credentials: true,
});

server.get("/", async (request, reply) => {
  request.log.info("Received request on root endpoint");
  return { message: "Server is running!" };
});

server.register(fastifyTRPCPlugin, {
  prefix: "/trpc",
  trpcOptions: {
    router: appRouter,
    createContext,
    onError({ path, error }) {
      console.error(`Error in tRPC handler on path '${path}':`, error);
    },
  } satisfies FastifyTRPCPluginOptions<AppRouter>["trpcOptions"],
});

(async () => {
  try {
    console.log("Attempting to start server...");

    // Log all addresses the server will listen on
    const addresses = await server.listen({
      port: 8002,
      host: "0.0.0.0",
    });

    console.log("Server addresses:", addresses);
    console.log("Server is listening on http://localhost:8002");

    // Log all registered routes
    console.log("Registered routes:");
    server.printRoutes();
  } catch (err) {
    console.error("Failed to start server:", err);
    server.log.error(err);
    process.exit(1);
  }
})();
