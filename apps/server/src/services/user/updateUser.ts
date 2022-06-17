import prisma from 'client';
import * as bcrypt from 'bcrypt';

interface UpdateUserRequest {
  id: string;
  name?: string;
  username?: string;
  password?: string;
}

export default async function updateUser(request: UpdateUserRequest): Promise<void> {
  const userInDb = await prisma.user.findUnique({
    where: {
      id: request.id,
    },
  });

  if (!userInDb) {
    return;
  }

  if (request.password) {
    request.password = await bcrypt.hash(request.password, 6);
  }

  await prisma.user.update({
    where: {
      id: request.id,
    },
    data: request,
  });
}
