import { Role } from '@lofhen/types';
import NotAuthorizedError from '@core/errors/notAuthorizedError';
import { middleware } from '..';

const ensureAdmin = middleware(({ ctx, next }) => {
  if (ctx.user?.role !== Role.ADMIN) {
    throw new NotAuthorizedError();
  }

  return next();
});

export default ensureAdmin;
