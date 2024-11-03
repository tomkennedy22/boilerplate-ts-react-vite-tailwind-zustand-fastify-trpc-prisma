import { PrismaClient } from "@prisma/client";

export * from "@prisma/client";

export const extendedPrismaClient = new PrismaClient({
  log: ["query", "info", "warn", "error"],
}).$extends({
  name: "extendedPrismaClient",
  result: {
    user: {
      fullName: {
        needs: { firstName: true, lastName: true },
        compute(user) {
          return `${user.firstName} ${user.lastName}`;
        },
      },
    },
  },
});

export type ExtendedPrismaClient = typeof extendedPrismaClient;
