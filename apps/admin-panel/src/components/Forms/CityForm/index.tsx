import { StateDTO } from '@lofhen/types';
import { AlginRightBox } from '@lofhen/ui-kit';
import { Button, Stack } from '@mui/material';
import FormInput from 'components/Form/FormInput';
import FormSelect from 'components/Form/FormSelect';
import { useMemo } from 'react';
import { BaseFormProps } from '../baseFormProps';

interface CityFormProps extends BaseFormProps {
  states?: Array<StateDTO>;
}

const CityForm = ({ onSubmit, control, loading, states }: CityFormProps): React.ReactElement => {
  const options = useMemo(() => {
    return (
      states?.map(state => ({
        label: state.name,
        value: state.id,
      })) || []
    );
  }, [states]);

  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={1}>
        <FormInput name="name" label="Nome" control={control} />

        <FormSelect name="stateId" options={options} control={control} />

        <AlginRightBox>
          <Button disabled={loading} variant="contained" type="submit" sx={{ px: 7 }}>
            Salvar
          </Button>
        </AlginRightBox>
      </Stack>
    </form>
  );
};

export default CityForm;
