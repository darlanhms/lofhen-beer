import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string({
    required_error: 'Nome de usuário é obrigatório',
  }),
  password: z.string({
    required_error: 'Senha é obrigatória',
  }),
});

export type LoginRequest = z.infer<typeof loginSchema>;
