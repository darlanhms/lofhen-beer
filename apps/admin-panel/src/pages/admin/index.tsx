import Layout from 'components/Layout';
import PageMetadata from 'components/PageMetadata';
import { CustomPage } from 'types/customPage';

const AdminHome: CustomPage = () => {
  return <PageMetadata title="Administração" />;
};

AdminHome.layout = Layout;

export default AdminHome;
