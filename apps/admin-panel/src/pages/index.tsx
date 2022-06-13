/* eslint-disable  */
import type { GetServerSideProps, NextPage } from 'next';
import apiClient from 'services/api';

const Home: NextPage = () => {
  return <></>;
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const {
      data: { user },
    } = await apiClient.get('/users/current-user', {
      headers: req.headers as any,
    });

    if (user) {
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
    redirect: {
      destination: '/login',
      permanent: false,
    },
    props: {},
  };
};


export default Home;
