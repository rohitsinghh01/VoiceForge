import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { createTRPCContext } from "@/trpc/init";
import { appRouter } from "@/trpc/routers/_app";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: createTRPCContext,
    onError: ({ path, error }) => {
      if (process.env.NODE_ENV !== "development") return;
      console.error(`[tRPC] ${path ?? "(unknown)"}:`, error.message);
      if (error.cause instanceof Error) {
        console.error("[tRPC] cause:", error.cause.message, error.cause);
      }
    },
  });
export { handler as GET, handler as POST };