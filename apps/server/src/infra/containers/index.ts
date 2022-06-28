import { container } from 'tsyringe';
import IAddressRepository from '@repositories/IAddressRepository';
import ICityRepository from '@repositories/ICityRepository';
import ICustomerRepository from '@repositories/ICustomerRepository';
import IStateRepository from '@repositories/IStateRepository';
import IUserRepository from '@repositories/IUserRepository';
import AddressRepository from '@repositories/prisma/addressRepository';
import CityRepository from '@repositories/prisma/cityRepository';
import CustomerRepository from '@repositories/prisma/customerRepository';
import StateRepository from '@repositories/prisma/stateRepository';
import UserRepository from '@repositories/prisma/userRepository';

import './providers';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<ICityRepository>('CityRepository', CityRepository);

container.registerSingleton<IStateRepository>('StateRepository', StateRepository);

container.registerSingleton<IAddressRepository>('AddressRepository', AddressRepository);

container.registerSingleton<ICustomerRepository>('CustomerRepository', CustomerRepository);
