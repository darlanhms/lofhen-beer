import { inject, injectable } from 'tsyringe';
import UseCase from '@core/UseCase';
import AddressEntity from '@entities/address';
import IAddressRepository from '@repositories/IAddressRepository';

@injectable()
export default class FindAddressById implements UseCase<string, AddressEntity | null> {
  constructor(
    @inject('AddressRepository')
    private addressRepo: IAddressRepository,
  ) {}

  execute(id: string): Promise<AddressEntity | null> {
    return this.addressRepo.findById(id);
  }
}
