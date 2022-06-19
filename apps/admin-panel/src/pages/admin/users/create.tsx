import Router from 'next/router';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { Role } from '@lofhen/types';
import { useAlert } from '@lofhen/ui-kit';
import { formatErrorMessage } from '@lofhen/utils';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FormLayout from 'components/Form/FormLayout';
import UserForm from 'components/Forms/UserForm';
import Layout from 'components/Layout';
import PageMetadata from 'components/PageMetadata';
import { createUser, CreateUserRequest } from 'lib/user/createUser';
import { CustomPage } from 'types/customPage';

const userSchema = yup
  .object({
    name: yup.string().required('Informe um nome'),
    username: yup.string().required('Informe um nome de usuário'),
    password: yup
      .string()
      .required('Informe uma senha')
      .min(4, 'Mínimo 4 caracteres')
      .max(20, 'Máximo 20 caracteres'),
    role: yup.string().required('Informe um cargo').oneOf([Role.ADMIN, Role.AGENT]),
  })
  .required();

const CreateUserPage: CustomPage = () => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(userSchema),
    defaultValues: {
      name: '',
      username: '',
      password: '',
      role: Role.ADMIN,
    },
  });
  const { errorAlert } = useAlert();

  const createUserMutation = useMutation(
    async (data: CreateUserRequest) => {
      return createUser(data);
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

  const onSubmit = (data: CreateUserRequest) => {
    createUserMutation.mutate(data);
  };

  return (
    <FormLayout onBack={() => Router.back()} title="Novo usuário">
      <PageMetadata title="Novo usuário" />
      <UserForm control={control} onSubmit={handleSubmit(onSubmit)} loading={createUserMutation.isLoading} />
    </FormLayout>
  );
};

CreateUserPage.layout = Layout;

export default CreateUserPage;
