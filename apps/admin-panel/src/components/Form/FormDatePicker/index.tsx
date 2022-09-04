import { Controller } from 'react-hook-form';
import { IoMdClose } from 'react-icons/io';
import { Input, InputProps } from '@lofhen/ui-kit';
import { MobileDatePicker, MobileDatePickerProps } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import ptBrLocale from 'date-fns/locale/pt-BR';
import { BaseFormInputProps } from '../baseFormInputProps';

type DatePickerProps = Omit<MobileDatePickerProps<any, any>, 'value' | 'onChange' | 'renderInput'>;

interface FormDatePickerProps extends BaseFormInputProps, DatePickerProps {
  inputProps?: InputProps;
}

const FormDatePicker: React.FC<FormDatePickerProps> = ({ control, name, inputProps, ...rest }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBrLocale}>
      <Controller
        name={name}
        control={control}
        defaultValue={new Date()}
        render={({ field, fieldState: { error } }) => (
          <MobileDatePicker
            value={field.value}
            onChange={newValue => field.onChange(newValue)}
            renderInput={props => (
              <Input
                {...inputProps}
                {...props}
                errorMessage={error?.message}
                adornmentPosition="end"
                adornmentIcon={<IoMdClose />}
                onClickAdornment={() => field.onChange(null)}
              />
            )}
            {...rest}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default FormDatePicker;
