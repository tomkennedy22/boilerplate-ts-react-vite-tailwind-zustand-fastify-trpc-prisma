import {
  extendedPrismaClient,
  Prisma,
  ExtendedPrismaClient,
} from "@boilerplate-ts-turborepo-react-vite-tailwind-zustand-fastify-trpc-prisma/db";
import { initTRPC, inferProcedureOutput } from "@trpc/server";
import { z } from "zod";
// import { mutations } from "./_mutations";
import { generateOpenApiDocument, OpenApiMeta } from "trpc-to-openapi";

const t = initTRPC.meta<OpenApiMeta>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

const prisma = extendedPrismaClient;

export const appRouter = router({
  greeting: publicProcedure
    .meta({ openapi: { method: "GET", path: "/greeting" } })
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      console.log("In greeting");
      return { message: `Hello, ${input.name}!` };
    }),
});

export const openApiDocument = generateOpenApiDocument(appRouter, {
  title: "tRPC OpenAPI",
  version: "1.0.0",
  baseUrl: "http://localhost:8118",
});

type ConvertDatesToStrings<T> = {
  [K in keyof T]: T[K] extends Date
    ? string
    : T[K] extends Array<infer U> // Handle arrays of objects
      ? Array<ConvertDatesToStrings<U>>
      : T[K] extends object // Recursively handle nested objects
        ? ConvertDatesToStrings<T[K]>
        : T[K]; // For other types, retain the original type
};

type ConvertAndInferProcedureOutput<T> = ConvertDatesToStrings<
  inferProcedureOutput<T>
>;
export type AppRouter = typeof appRouter;
