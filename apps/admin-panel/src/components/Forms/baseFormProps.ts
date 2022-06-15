import { FormEventHandler } from 'react';
import { Control } from 'react-hook-form';

export interface BaseFormProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
  control: Control<any, any>;
  loading?: boolean;
}
