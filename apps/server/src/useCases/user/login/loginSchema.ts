import { z } from 'zod';

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type LoginRequest = z.infer<typeof loginSchema>;

export default loginSchema;
