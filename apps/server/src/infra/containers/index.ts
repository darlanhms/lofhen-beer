import IUserRepository from '@repositories/IUserRepository';
import UserRepository from '@repositories/prisma/userRepository';
import { container } from 'tsyringe';

import './providers';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
