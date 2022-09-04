import { Controller } from 'react-hook-form';
import { Input } from '@lofhen/ui-kit';
import { MobileDateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ptBrLocale from 'date-fns/locale/pt-BR';
import { BaseFormInputProps } from '../baseFormInputProps';

const FormDateTimePicker: React.FC<BaseFormInputProps> = ({ control, name }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBrLocale}>
      <Controller
        name={name}
        control={control}
        defaultValue={new Date()}
        render={({ field }) => (
          <MobileDateTimePicker
            value={field.value}
            shouldDisableYear={() => true}
            onChange={newValue => field.onChange(newValue)}
            renderInput={props => <Input {...props} />}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default FormDateTimePicker;
