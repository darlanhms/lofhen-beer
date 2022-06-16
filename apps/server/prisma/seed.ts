import { PrismaClient } from '@prisma/client';
import { seedCities } from './seedings/cities';
import { seedStates } from './seedings/states';
import { seedUsers } from './seedings/users';

const prisma = new PrismaClient();

async function main() {
  await seedUsers();
  await seedStates();
  await seedCities();
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
