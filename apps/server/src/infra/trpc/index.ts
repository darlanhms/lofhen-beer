import { initTRPC } from '@trpc/server';
import { Context } from './context';

const trpc = initTRPC.context<Context>().create();

export const { router } = trpc;
export const { middleware } = trpc;
export default trpc;
