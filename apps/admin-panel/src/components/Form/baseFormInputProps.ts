import { Control, FieldValues, UseFormWatch } from 'react-hook-form';

export interface BaseFormInputProps {
  name: string;
  control: Control<FieldValues, any>;
  watch?: UseFormWatch<any>;
}
