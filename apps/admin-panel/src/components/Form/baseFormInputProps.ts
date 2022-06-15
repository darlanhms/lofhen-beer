import { Control, FieldValues } from 'react-hook-form';

export interface BaseFormInputProps {
  name: string;
  control: Control<FieldValues, any>;
}
