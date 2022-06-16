import { PrismaClient, Role, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function seedUsers(): Promise<void> {
  if (!process.env.ADMIN_PASSWORD) {
    throw new Error('You must define an admin default password in environment variables.');
  }

  const defaultUsers: Array<User> = [
    {
      id: '325c1e33-7fd7-433f-8447-11f218a63b46',
      name: 'Marinho',
      username: 'marinho',
      createdAt: new Date(),
      password: await bcrypt.hash(process.env.ADMIN_PASSWORD, 6),
      role: Role.ADMIN,
      deleted: false,
    },
    {
      id: 'ba444f32-ff27-4ec9-bbc5-c533bc73bbd6',
      name: 'Lissandro',
      username: 'lissandro',
      createdAt: new Date(),
      password: await bcrypt.hash(process.env.ADMIN_PASSWORD, 6),
      role: Role.ADMIN,
      deleted: false,
    },
  ];

  for (const user of defaultUsers) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: user,
    });
  }
}
