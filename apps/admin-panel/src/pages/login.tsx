import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import Router from 'next/router';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useAlert } from '@lofhen/ui-kit';
import { formatErrorMessage } from '@lofhen/utils';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Container, Stack } from '@mui/material';
import bannerImg from 'assets/images/banner.png';
import FormInput from 'components/Form/FormInput';
import PageMetadata from 'components/PageMetadata';
import apiClient from 'services/api';

const loginSchema = yup
  .object({
    username: yup.string().required('Informe um nome de usuário'),
    password: yup.string().required('Informe a senha'),
  })
  .required();

const Login: NextPage = () => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const { errorAlert } = useAlert();

  const loginMutation = useMutation(
    async (data: any) => {
      return apiClient.post('/users/login', data, {
        withCredentials: true,
      });
    },
    {
      onError: error => {
        errorAlert(formatErrorMessage(error));
      },
      onSuccess: () => {
        Router.push('/admin');
      },
    },
  );

  const onSubmit = (data: any) => {
    loginMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PageMetadata title="Login" />
      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          paddingTop: '50px',
        }}
      >
        <Box display="flex" justifyContent="center">
          <Image src={bannerImg} width={400} height={400} />
        </Box>

        <Stack spacing={1} sx={{ width: '100%' }}>
          <FormInput name="username" label="Nome de usuário" control={control} />
          <FormInput name="password" label="Senha" type="password" control={control} />
        </Stack>

        <Button type="submit" fullWidth sx={{ borderRadius: 1.5, mt: 1 }} variant="contained">
          Login
        </Button>
      </Container>
    </form>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const { data } = await apiClient.get('/users/current-user', {
      headers: req.headers as any,
    });

    if (data) {
      return {
        redirect: {
          destination: '/admin',
          permanent: false,
        },
        props: {},
      };
    }
    // eslint-disable-next-line no-empty
  } catch (error) {}

  return {
    props: {},
  };
};

export default Login;
