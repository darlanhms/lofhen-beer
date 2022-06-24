import { useEffect } from 'react';
import Router from 'next/router';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useAlert } from '@lofhen/ui-kit';
import { formatErrorMessage } from '@lofhen/utils';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FormLayout from 'components/Form/FormLayout';
import AddressForm from 'components/Forms/AddressForm';
import Layout from 'components/Layout';
import PageMetadata from 'components/PageMetadata';
import createAddress, { CreateAddressRequest } from 'lib/address/createAddress';
import useCities from 'lib/city/useCities';
import { CustomPage } from 'types/customPage';

const addressSchema = yup
  .object({
    alias: yup.string().required('Apelido é obrigatório'),
    cityId: yup.string().required('Cidade é obrigatória'),
  })
  .required();

const CreateAddressPage: CustomPage = () => {
  const { errorAlert } = useAlert();
  const { control, handleSubmit, setValue } = useForm<CreateAddressRequest>({
    resolver: yupResolver(addressSchema),
    defaultValues: {
      alias: '',
      cityId: '',
      link: '',
      neighborhood: '',
      complement: '',
      number: '',
      reference: '',
      street: '',
    },
  });

  const { data: cities } = useCities();

  const createAddressMutation = useMutation(
    async (data: CreateAddressRequest) => {
      return createAddress(data);
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

  const onSubmit = (data: CreateAddressRequest) => {
    createAddressMutation.mutate(data);
  };

  useEffect(() => {
    if (cities) {
      const sjb = cities.find(city => city.name === 'São João Batista');

      if (sjb) {
        setValue('cityId', sjb.id);
      } else {
        setValue('cityId', cities[0].id);
      }
    }
  }, [cities]);

  return (
    <FormLayout onBack={() => Router.back()} title="Novo Endereço">
      <PageMetadata title="Novo Endereço" />
      <AddressForm
        cities={cities}
        control={control}
        onSubmit={handleSubmit(onSubmit)}
        loading={createAddressMutation.isLoading}
      />
    </FormLayout>
  );
};

CreateAddressPage.layout = Layout;

export default CreateAddressPage;
