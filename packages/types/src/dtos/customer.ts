import { AddressDTO } from './address';

export interface CustomerDTO {
  id: string;
  name: string;
  birthdate: Date | null;
  phone: string | null;
  observation: string | null;
  createdAt: Date;
  enabled: boolean;
  createdBy: string;
  addresses: AddressDTO[];
}
