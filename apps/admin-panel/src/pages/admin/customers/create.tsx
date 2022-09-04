import Router from 'next/router';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useAlert } from '@lofhen/ui-kit';
import { formatErrorMessage } from '@lofhen/utils';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FormLayout from 'components/Form/FormLayout';
import CustomerForm from 'components/Forms/CustomerForm';
import Layout from 'components/Layout';
import PageMetadata from 'components/PageMetadata';
import createCustomer, { CreateCustomerRequest } from 'lib/customer/createCustomer';
import { CustomPage } from 'types/customPage';

const customerSchema = yup
  .object({
    name: yup.string().required('Nome é obrigatório'),
    phone: yup.string().required('Telefone é obrigatório'),
    birthdate: yup.date().nullable(),
    addresses: yup
      .array()
      .of(
        yup.object({
          alias: yup.string().required('Apelido é obrigatório'),
          cityId: yup.string().required('Cidade é obrigatória'),
        }),
      )
      .nullable(),
  })
  .required();

const CreateCustomerPage: CustomPage = () => {
  const { errorAlert } = useAlert();
  const { control, handleSubmit } = useForm<CreateCustomerRequest>({
    resolver: yupResolver(customerSchema),
    defaultValues: {
      name: '',
      phone: '',
      birthdate: null,
      observation: '',
    },
  });

  const createCustomerMutation = useMutation(
    (data: CreateCustomerRequest) => {
      return createCustomer(data);
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

  const onSubmit = (data: CreateCustomerRequest) => {
    createCustomerMutation.mutate(data);
  };

  return (
    <FormLayout onBack={() => Router.back()} title="Novo cliente">
      <PageMetadata title="Novo cliente" />
      <CustomerForm
        loading={createCustomerMutation.isLoading}
        onSubmit={handleSubmit(onSubmit)}
        control={control}
      />
    </FormLayout>
  );
};

CreateCustomerPage.layout = Layout;

export default CreateCustomerPage;
