import { initTRPC } from '@trpc/server';
import { Context } from './context';

const t = initTRPC.context<Context>().create();

export const { router } = t;
export const { middleware } = t;
export const publicProcedure = t.procedure;
