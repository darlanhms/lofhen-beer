import NotAuthorizedError from '@core/errors/notAuthorizedError';
import { middleware } from '..';

const ensureAuth = middleware(({ ctx, next }) => {
  if (!ctx.user) {
    throw new NotAuthorizedError();
  }

  return next();
});

export default ensureAuth;
