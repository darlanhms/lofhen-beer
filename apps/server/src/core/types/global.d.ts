/* eslint-disable @typescript-eslint/prefer-namespace-keyword */
import { Role, User } from '@prisma/client';

declare global {
  function authenticate(role?: Role): Promise<string[]>;
  function auth(role?: Role): Promise<[string, User]>;
}
