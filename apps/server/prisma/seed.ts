import { PrismaClient, Role, User } from '@prisma/client';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  if (!process.env.ADMIN_PASSWORD) {
    throw new Error('You must define an admin default password in environment variables.');
  }

  const defaultUsers: Array<User> = [
    {
      id: uuid(),
      name: 'Marinho',
      username: 'marinho',
      createdAt: new Date(),
      password: await bcrypt.hash(process.env.ADMIN_PASSWORD, 6),
      role: Role.ADMIN,
    },
    {
      id: uuid(),
      name: 'Lissandro',
      username: 'lissandro',
      createdAt: new Date(),
      password: await bcrypt.hash(process.env.ADMIN_PASSWORD, 6),
      role: Role.ADMIN,
    },
  ];

  for (const user of defaultUsers) {
    await prisma.user.upsert({
      where: { username: user.username },
      update: {},
      create: user,
    });
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
