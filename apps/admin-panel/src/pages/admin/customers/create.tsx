import Router from 'next/router';
import { useForm } from 'react-hook-form';
import FormLayout from 'components/Form/FormLayout';
import CustomerForm from 'components/Forms/CustomerForm';
import Layout from 'components/Layout';
import PageMetadata from 'components/PageMetadata';
import { CustomPage } from 'types/customPage';

const CreateCustomerPage: CustomPage = () => {
  const { control, handleSubmit } = useForm({
    // resolver: yupResolver(userSchema),
    defaultValues: {
      name: '',
      phone: '',
    },
  });

  return (
    <FormLayout onBack={() => Router.back()} title="Novo cliente">
      <PageMetadata title="Novo cliente" />
      <CustomerForm onSubmit={handleSubmit(console.info)} control={control} />
    </FormLayout>
  );
};

CreateCustomerPage.layout = Layout;

export default CreateCustomerPage;
