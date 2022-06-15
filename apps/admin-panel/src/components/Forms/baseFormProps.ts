import { FormEventHandler } from 'react';
import { Control, UseFormWatch } from 'react-hook-form';

export interface BaseFormProps {
  onSubmit: FormEventHandler<HTMLFormElement>;
  control: Control<any, any>;
  loading?: boolean;
  isUpdating?: boolean;
  watch?: UseFormWatch<any>;
}
