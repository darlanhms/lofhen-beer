/* eslint-disable @typescript-eslint/prefer-namespace-keyword */
import { Role } from '@prisma/client';

declare global {
  function authenticate(role?: Role): Promise<string[]>;
}
