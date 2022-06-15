import FormInput from 'components/Form/FormInput';
import { Button, Stack } from '@mui/material';
import { AlginRightBox } from '@lofhen/ui-kit';
import FormSelect from 'components/Form/FormSelect';
import { Role } from '@lofhen/types';
import { BaseFormProps } from '../baseFormProps';

const UserForm = ({ onSubmit, control, loading, watch, isUpdating }: BaseFormProps): React.ReactElement => {
  return (
    <form onSubmit={onSubmit}>
      <Stack spacing={1}>
        <FormInput name="name" label="Nome" control={control} watch={watch} />
        <FormInput name="username" label="Nome de usuário" control={control} watch={watch} />
        {!isUpdating && (
          <FormSelect
            name="role"
            control={control}
            label="Cargo"
            options={[
              {
                label: 'Administrador',
                value: Role.ADMIN,
              },
              {
                label: 'Representante',
                value: Role.AGENT,
              },
            ]}
          />
        )}
        <FormInput name="password" label="Senha" type="password" control={control} />

        <AlginRightBox>
          <Button disabled={loading} variant="contained" type="submit" sx={{ px: 7 }}>
            Salvar
          </Button>
        </AlginRightBox>
      </Stack>
    </form>
  );
};

export default UserForm;
