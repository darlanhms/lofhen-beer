import prisma from 'client';
import UserModel from 'models/user';

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

  const user = UserModel.toModel(userInDb);

  user.update(request);

  await prisma.user.update({
    where: {
      id: request.id,
    },
    data: await user.toPersistence(),
  });
}
