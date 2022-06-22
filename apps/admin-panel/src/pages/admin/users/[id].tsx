import { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { useAlert } from '@lofhen/ui-kit';
import { formatErrorMessage } from '@lofhen/utils';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FormLayout from 'components/Form/FormLayout';
import UserForm from 'components/Forms/UserForm';
import Layout from 'components/Layout';
import PageMetadata from 'components/PageMetadata';
import { getUserById } from 'lib/user/getUserById';
import { updateUser, UpdateUserRequest } from 'lib/user/updateUser';
import { CustomPage } from 'types/customPage';

const userSchema = yup
  .object({
    name: yup.string().required('Informe um nome'),
    username: yup.string().required('Informe um nome de usuário'),
    password: yup
      .string()
      .transform((o, c) => (o === '' ? undefined : c))
      .min(4, 'Mínimo 4 caracteres')
      .max(20, 'Máximo 20 caracteres'),
  })
  .required();

const UpdateUserPage: CustomPage = () => {
  const { control, handleSubmit, setValue } = useForm({
    resolver: yupResolver(userSchema),
    defaultValues: {
      name: '',
      username: '',
      password: '',
    },
  });
  const { errorAlert } = useAlert();
  const id = useRouter().query.id as string;

  const { data: user } = useQuery(
    ['getUserById', id],
    async () => {
      if (!id) {
        return null;
      }

      return getUserById(id);
    },
    {
      onError: error => {
        errorAlert(formatErrorMessage(error));
      },
    },
  );

  const updateUserMutation = useMutation(
    async (data: UpdateUserRequest) => {
      return updateUser(data);
    },
    {
      onError: error => {
        errorAlert(formatErrorMessage(error));
      },
      onSuccess: () => {
        Router.back();
      },
    },
  );

  useEffect(() => {
    if (user) {
      setValue('name', user.name);
      setValue('username', user.username);
    }
  }, [user]);

  const onSubmit = (data: UpdateUserRequest) => {
    updateUserMutation.mutate(data);
  };

  return (
    <FormLayout onBack={() => Router.back()} title="Editar usuário">
      <PageMetadata title="Editar usuário" />
      <UserForm
        control={control}
        onSubmit={handleSubmit(data => onSubmit({ ...data, id }))}
        loading={updateUserMutation.isLoading}
        isUpdating
      />
    </FormLayout>
  );
};

UpdateUserPage.layout = Layout;

export default UpdateUserPage;
