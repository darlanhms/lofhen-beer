import { GetServerSideProps, NextPage } from 'next';
import apiClient from 'services/api';
import { Input } from 'ui-kit';

const Login: NextPage = () => {
  return <Input name="Test" label="Nome de usuário" type="password" />;
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const {
      data: { user },
    } = await apiClient.get('/users/current-user');

    if (user) {
      return {
        redirect: '/admin',
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
