import { z } from 'zod';
import { Role } from '../../utils';

export const createUserSchema = z.object({
  name: z.string({
    required_error: 'Nome é obrigatório',
  }),
  username: z.string({
    required_error: 'Nome de usuário é obrigatório',
  }),
  role: z.nativeEnum(Role, {
    required_error: 'Cargo é obrigatório',
    invalid_type_error: 'Cargo deve ser ADMIN ou AGENT',
  }),
  password: z
    .string({
      required_error: 'Senha é obrigatória',
    })
    .min(4, 'Senha deve ter no mínimo 4 caracteres')
    .max(20, 'Senha deve ter no máximo 20 caracteres'),
});

export type CreateUserRequest = z.infer<typeof createUserSchema>;
