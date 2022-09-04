import { useMemo } from 'react';
import { useFieldArray } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { AddressDTO } from '@lofhen/types';
import { AlginRightBox } from '@lofhen/ui-kit';
import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import FormDatePicker from 'components/Form/FormDatePicker';
import FormInput from 'components/Form/FormInput';
import FormPhoneInput from 'components/Form/FormPhoneInput';
import FormSelect from 'components/Form/FormSelect';
import FormSwitch from 'components/Form/FormSwitch';
import useCities from 'lib/city/useCities';
import { BaseFormProps } from '../baseFormProps';

const CustomerForm: React.FC<BaseFormProps> = ({ onSubmit, control, loading, isUpdating }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'addresses',
    shouldUnregister: true,
  });

  const { data: cities } = useCities();

  const options = useMemo(() => {
    return (
      cities?.map(city => ({
        label: city.name,
        value: city.id,
      })) || []
    );
  }, [cities]);

  const sjbCity = useMemo(() => {
    return cities?.find(city => city.name === 'São João Batista');
  }, [cities]);

  const defaultAddress: Omit<AddressDTO, 'id' | 'customerId' | 'city' | 'enabled'> = {
    alias: '',
    link: '',
    cityId: sjbCity?.id || '',
    neighborhood: '',
    street: '',
    number: '',
    reference: '',
    complement: '',
  };

  const handleRemoveAddress = (index: number) => {
    remove(index);
  };

  return (
    <form noValidate onSubmit={onSubmit}>
      <Stack spacing={1}>
        <FormInput name="name" label="Nome" control={control} />
        <FormPhoneInput name="phone" label="Telefone" control={control} />
        <FormDatePicker name="birthdate" label="Aniversário" control={control} />
        <FormInput name="observation" label="Observação" multiline rows={2} control={control} />

        <Box>
          <Stack spacing={1}>
            <Typography variant="overline">Endereços (Opcional)</Typography>

            {fields.map((field, index) => (
              <Stack spacing={1} key={field.id}>
                <Box display="flex" justifyContent="space-between">
                  <Typography variant="subtitle1">Endereço {index + 1}</Typography>
                  <IconButton onClick={() => handleRemoveAddress(index)} sx={{ padding: '7px' }} color="error">
                    <IoMdClose size={18} />
                  </IconButton>
                </Box>
                <FormInput name={`addresses[${index}].alias`} label="Apelido" control={control} />
                {!isUpdating && (
                  <FormSelect
                    name={`addresses[${index}].cityId`}
                    defaultValue={sjbCity?.id || cities?.[0].id}
                    options={options}
                    control={control}
                  />
                )}
                <FormInput
                  name={`addresses[${index}].link`}
                  type="url"
                  label="Link (Opcional)"
                  control={control}
                />
                <FormInput
                  name={`addresses[${index}].neighborhood`}
                  label="Bairro (Opcional)"
                  control={control}
                />
                <FormInput name={`addresses[${index}].street`} label="Rua (Opcional)" control={control} />
                <FormInput name={`addresses[${index}].number`} label="Número (Opcional)" control={control} />
                <FormInput
                  name={`addresses[${index}].reference`}
                  label="Referência (Opcional)"
                  control={control}
                />
                <FormInput
                  name={`addresses[${index}].complement`}
                  label="Complemento (Opcional)"
                  control={control}
                />
                {isUpdating && (
                  <FormSwitch
                    name={`addresses[${index}].enabled`}
                    label="Endereço utilizável"
                    control={control}
                  />
                )}
              </Stack>
            ))}
          </Stack>
          <Button sx={{ mt: 1 }} onClick={() => append(defaultAddress)} color="success">
            <FaPlus style={{ marginRight: '10px' }} /> Adicionar endereço
          </Button>
        </Box>

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
