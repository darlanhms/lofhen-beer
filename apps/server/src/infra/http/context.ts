import { inferAsyncReturnType } from '@trpc/server';
import prisma from '@infra/prisma/client';

export default function createContext() {
  return {
    prisma,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
