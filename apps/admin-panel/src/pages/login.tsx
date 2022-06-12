import { GetServerSideProps, NextPage } from 'next';
import apiClient from 'services/api';

const Login: NextPage = () => {
  return <h1>Login</h1>;
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
