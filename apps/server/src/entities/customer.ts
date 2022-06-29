import { filledArray, onlyNumbers } from '@lofhen/utils';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, Length, ValidateNested } from 'class-validator';
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

type UpdateTableProps = Pick<CustomerProps, 'name' | 'birthdate' | 'phone' | 'observation' | 'enabled'>;

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

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => AddressEntity)
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

    if (filledArray(this.addresses)) {
      this.addresses.map(address => ({
        ...address,
        customerId: this.id,
      }));
    }
  }

  constructor(props: CustomerProps, id?: string) {
    super(props, id);

    this.normalize();
  }

  update(props: Partial<UpdateTableProps>): void {
    if (props.name) {
      this.name = props.name;
    }

    if (props.phone || props.phone === null) {
      this.phone = props.phone;
    }

    if (props.birthdate || props.birthdate === null) {
      this.birthdate = props.birthdate;
    }

    if (props.observation || props.observation === null) {
      this.observation = props.observation;
    }

    if (props.enabled || props.enabled === false) {
      this.enabled = props.enabled;
    }
  }
}
