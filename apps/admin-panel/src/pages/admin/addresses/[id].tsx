import { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { useAlert } from '@lofhen/ui-kit';
import { formatErrorMessage } from '@lofhen/utils';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FormLayout from 'components/Form/FormLayout';
import AddressForm from 'components/Forms/AddressForm';
import Layout from 'components/Layout';
import PageMetadata from 'components/PageMetadata';
import getAddressById from 'lib/address/getAddressById';
import updateAddress, { UpdateAddressRequest } from 'lib/address/updateAddress';
import useCities from 'lib/city/useCities';
import { CustomPage } from 'types/customPage';

const addressSchema = yup
  .object({
    alias: yup.string().required('Apelido é obrigatório'),
  })
  .required();

const UpdateAddressPage: CustomPage = () => {
  const { errorAlert } = useAlert();
  const { control, handleSubmit, setValue } = useForm<UpdateAddressRequest>({
    resolver: yupResolver(addressSchema),
    defaultValues: {
      alias: '',
      link: '',
      neighborhood: '',
      complement: '',
      number: '',
      reference: '',
      street: '',
      enabled: true,
    },
  });

  const { data: cities } = useCities();

  const id = useRouter().query.id as string;

  const { data: address } = useQuery(['getCityById', id], async () => {
    if (!id) {
      return null;
    }

    return getAddressById(id);
  });

  const updateAddressMutation = useMutation(
    async (data: UpdateAddressRequest) => {
      return updateAddress(data);
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
    if (address) {
      setValue('alias', address.alias);
      setValue('link', address.link);
      setValue('neighborhood', address.neighborhood);
      setValue('complement', address.complement);
      setValue('number', address.number);
      setValue('reference', address.reference);
      setValue('street', address.street);
      setValue('enabled', address.enabled);
    }
  }, [address]);

  const onSubmit = (data: UpdateAddressRequest) => {
    updateAddressMutation.mutate(data);
  };

  return (
    <FormLayout onBack={() => Router.back()} title="Editar Endereço">
      <PageMetadata title="Editar Endereço" />
      <AddressForm
        cities={cities}
        control={control}
        onSubmit={handleSubmit(data => onSubmit({ ...data, id }))}
        loading={updateAddressMutation.isLoading}
        isUpdating
      />
    </FormLayout>
  );
};

UpdateAddressPage.layout = Layout;

export default UpdateAddressPage;
