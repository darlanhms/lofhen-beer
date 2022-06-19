import { useEffect } from 'react';
import Router from 'next/router';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { useAlert } from '@lofhen/ui-kit';
import { formatErrorMessage } from '@lofhen/utils';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import FormLayout from 'components/Form/FormLayout';
import CityForm from 'components/Forms/CityForm';
import Layout from 'components/Layout';
import PageMetadata from 'components/PageMetadata';
import createCity, { CreateCityRequest } from 'lib/city/createCity';
import getStates from 'lib/state/getStates';
import { CustomPage } from 'types/customPage';

const citySchema = yup
  .object({
    name: yup.string().required('Informe um nome'),
    stateId: yup.string().required(),
  })
  .required();

const CreateCityPage: CustomPage = () => {
  const { errorAlert } = useAlert();
  const { control, handleSubmit, setValue } = useForm({
    resolver: yupResolver(citySchema),
    defaultValues: {
      name: '',
      stateId: '',
    },
  });

  const { data: states } = useQuery(['getState'], async () => {
    return getStates();
  });

  const createUserMutation = useMutation(
    async (data: CreateCityRequest) => {
      return createCity(data);
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

  const onSubmit = (data: CreateCityRequest) => {
    createUserMutation.mutate(data);
  };

  useEffect(() => {
    if (states) {
      setValue('stateId', states[0].id);
    }
  }, [states]);

  return (
    <FormLayout onBack={() => Router.back()} title="Nova cidade">
      <PageMetadata title="Novo cidade" />
      <CityForm
        states={states}
        control={control}
        onSubmit={handleSubmit(onSubmit)}
        loading={createUserMutation.isLoading}
      />
    </FormLayout>
  );
};

CreateCityPage.layout = Layout;

export default CreateCityPage;
