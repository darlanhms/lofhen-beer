import { useEffect } from 'react';
import Router, { useRouter } from 'next/router';
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
import { getCityById } from 'lib/city/getCityById';
import { updateCity, UpdateCityRequest } from 'lib/city/updateCity';
import getStates from 'lib/state/getStates';
import { CustomPage } from 'types/customPage';

const citySchema = yup
  .object({
    name: yup.string().required('Informe um nome'),
    stateId: yup.string().required(),
  })
  .required();

const UpdateCityPage: CustomPage = () => {
  const { errorAlert } = useAlert();
  const { control, handleSubmit, setValue } = useForm({
    resolver: yupResolver(citySchema),
    defaultValues: {
      name: '',
      stateId: '',
    },
  });
  const id = useRouter().query.id as string;

  const { data: city } = useQuery(['getCityById', id], async () => {
    if (!id) {
      return null;
    }

    return getCityById(id);
  });

  const { data: states } = useQuery(['getState'], async () => {
    return getStates();
  });

  const updateCityMutation = useMutation(
    async (data: UpdateCityRequest) => {
      return updateCity(data);
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

  const onSubmit = (data: UpdateCityRequest) => {
    updateCityMutation.mutate(data);
  };

  useEffect(() => {
    if (states && city) {
      setValue('name', city.name);
      setValue('stateId', city.stateId);
    }
  }, [states, city]);

  return (
    <FormLayout onBack={() => Router.back()} title="Editar cidade">
      <PageMetadata title="Editar cidade" />
      <CityForm
        states={states}
        control={control}
        onSubmit={handleSubmit(data => onSubmit({ ...data, id }))}
        loading={updateCityMutation.isLoading}
      />
    </FormLayout>
  );
};

UpdateCityPage.layout = Layout;

export default UpdateCityPage;
