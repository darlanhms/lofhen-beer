import { TRPCError } from '@trpc/server';

export default class NotAuthorizedError extends TRPCError {
  constructor() {
    super({
      code: 'UNAUTHORIZED',
      message: 'Não autorizado a realizar a operação',
    });
  }
}
