import Layout from 'components/Layout';
import { CustomPage } from 'types/customPage';

const AdminHome: CustomPage = () => {
  return <h1>Hello admin</h1>;
};

AdminHome.layout = Layout;

export default AdminHome;
