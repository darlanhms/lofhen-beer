import { container } from 'tsyringe';
import ICityRepository from '@repositories/ICityRepository';
import IStateRepository from '@repositories/IStateRepository';
import IUserRepository from '@repositories/IUserRepository';
import CityRepository from '@repositories/prisma/cityRepository';
import StateRepository from '@repositories/prisma/stateRepository';
import UserRepository from '@repositories/prisma/userRepository';

import './providers';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<ICityRepository>('CityRepository', CityRepository);

container.registerSingleton<IStateRepository>('StateRepository', StateRepository);
