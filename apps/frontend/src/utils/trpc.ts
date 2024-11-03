import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "@boilerplate-ts-turborepo-react-vite-tailwind-zustand-fastify-trpc-prisma/api";

export const trpc = createTRPCReact<AppRouter>();
