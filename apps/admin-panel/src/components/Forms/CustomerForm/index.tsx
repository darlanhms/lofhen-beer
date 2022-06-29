import { AlginRightBox } from '@lofhen/ui-kit';
import { Button, Stack } from '@mui/material';
import FormPhoneInput from 'components/Form/FormPhoneInput';
import { BaseFormProps } from '../baseFormProps';

const CustomerForm: React.FC<BaseFormProps> = ({ onSubmit, control, loading }) => {
  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={1}>
        <FormPhoneInput name="phone" control={control} />

        <AlginRightBox>
          <Button disabled={loading} variant="contained" type="submit" sx={{ px: 7 }}>
            Salvar
          </Button>
        </AlginRightBox>
      </Stack>
    </form>
  );
};

export default CustomerForm;
