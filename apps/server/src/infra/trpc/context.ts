/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { UserDTO } from '@lofhen/contracts';

import { inferAsyncReturnType } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import prisma from '@infra/prisma/client';

function getUserFromHeader(req: Request): UserDTO | undefined {
  try {
    if (!req.headers.authorization) {
      return undefined;
    }

    return jwt.verify(req.headers.authorization, process.env.JWT_SECRET as string) as UserDTO;
  } catch (error) {
    return undefined;
  }
}

export default function createContext({ req }: trpcExpress.CreateExpressContextOptions) {
  const user = getUserFromHeader(req);

  return {
    prisma,
    user,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;
