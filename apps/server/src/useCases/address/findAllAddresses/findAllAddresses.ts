import { inject, injectable } from 'tsyringe';
import UseCase from '@core/UseCase';
import AddressEntity from '@entities/address';
import IAddressRepository from '@repositories/IAddressRepository';

@injectable()
export default class FindAllAddresses implements UseCase<undefined, Array<AddressEntity>> {
  constructor(
    @inject('AddressRepository')
    private addressRepo: IAddressRepository,
  ) {}

  execute(): Promise<Array<AddressEntity>> {
    return this.addressRepo.findAll();
  }
}
