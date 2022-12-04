import ensureAdmin from './middlewares/ensureAdmin';
import ensureAuth from './middlewares/ensureAuth';
import trpc from './index';

export const publicProcedure = trpc.procedure;
export const protectedProcedure = trpc.procedure.use(ensureAuth);
export const adminProcedure = trpc.procedure.use(ensureAdmin);
