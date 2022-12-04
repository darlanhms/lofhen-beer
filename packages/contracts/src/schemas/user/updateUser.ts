import { z } from 'zod';

export const updateUserSchema = z.object({
  id: z.string({
    required_error: 'ID é obrigatório',
  }),
  name: z.string().optional(),
  username: z.string().optional(),
  password: z
    .string()
    .min(4, 'Senha deve ter no mínimo 4 caracteres')
    .max(20, 'Senha deve ter no máximo 20 caracteres')
    .optional(),
});

export type UpdateUserRequest = z.infer<typeof updateUserSchema>;
