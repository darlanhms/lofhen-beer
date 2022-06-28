import { onlyNumbers } from '@lofhen/utils';
import { IsDate, IsNotEmpty, IsOptional, Length } from 'class-validator';
import Entity from '@core/Entity';
import AddressEntity from './address';

interface CustomerProps {
  name: string;
  birthdate: Date | null;
  phone: string | null;
  observation: string | null;
  createdBy: string;
  createdAt?: Date;
  enabled?: boolean;
  addresses: AddressEntity[];
}

export default class CustomerEntity extends Entity<CustomerProps> {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  name: string;

  @IsOptional()
  @IsDate({ message: 'Data de nascimento deve ser válida' })
  birthdate: Date | null;

  @IsOptional()
  @Length(10, 11, { message: 'Telefone deve ter entre 10 e 11 dígitos' })
  phone: string | null;

  observation: string | null;

  @IsNotEmpty({ message: 'Criado por é obrigatório' })
  createdBy: string;

  enabled: boolean;

  createdAt: Date;

  addresses: AddressEntity[];

  private normalize(): void {
    if (this.birthdate) {
      this.birthdate = new Date(this.birthdate);
    }

    if (this.phone) {
      this.phone = onlyNumbers(this.phone);
    }

    if (!this.createdAt) {
      this.createdAt = new Date();
    }

    if (!this.enabled) {
      this.enabled = true;
    }
  }

  constructor(props: CustomerProps, id?: string) {
    super(props, id);

    this.normalize();
  }
}
