import { createTRPCRouter } from '../init';
import { billingRouter } from './billing';
import { generationsRouter } from './generations';
import { voicesRouter } from './voices';
export const appRouter = createTRPCRouter({
    billing: billingRouter,
    voices: voicesRouter,
    generations: generationsRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;