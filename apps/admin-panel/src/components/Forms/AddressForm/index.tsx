import { useMemo } from 'react';
import { CityDTO } from '@lofhen/types';
import { AlginRightBox } from '@lofhen/ui-kit';
import { Button, Stack } from '@mui/material';
import FormInput from 'components/Form/FormInput';
import FormSelect from 'components/Form/FormSelect';
import { BaseFormProps } from '../baseFormProps';

interface AddressFormProps extends BaseFormProps {
  cities?: Array<CityDTO>;
}

const AddressForm: React.FunctionComponent<AddressFormProps> = ({ onSubmit, control, loading, cities }) => {
  const options = useMemo(() => {
    return (
      cities?.map(city => ({
        label: city.name,
        value: city.id,
      })) || []
    );
  }, [cities]);

  return (
    <form noValidate onSubmit={onSubmit}>
      <Stack spacing={1}>
        <FormInput name="alias" label="Apelido" control={control} />
        <FormSelect name="cityId" options={options} control={control} />
        <FormInput name="link" type="url" label="Link (Opcional)" control={control} />
        <FormInput name="neighborhood" label="Bairro (Opcional)" control={control} />
        <FormInput name="street" label="Rua (Opcional)" control={control} />
        <FormInput name="number" label="Número (Opcional)" control={control} />
        <FormInput name="reference" label="Referência (Opcional)" control={control} />
        <FormInput name="complement" label="Complemento (Opcional)" control={control} />

        <AlginRightBox>
          <Button disabled={loading} variant="contained" type="submit" sx={{ px: 7 }}>
            Salvar
          </Button>
        </AlginRightBox>
      </Stack>
    </form>
  );
};

export default AddressForm;
