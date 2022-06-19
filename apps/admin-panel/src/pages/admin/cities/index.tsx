import Router from 'next/router';
import { useQuery } from 'react-query';
import { FaPlus, FaPencilAlt } from 'react-icons/fa';
import { DataTable, FlexAlignRight, useAlert, useTableSelection } from '@lofhen/ui-kit';
import { formatErrorMessage } from '@lofhen/utils';
import { Button, Container, IconButton, Tooltip } from '@mui/material';
import HeaderTitle from 'components/HeaderTitle';
import Layout from 'components/Layout';
import PageMetadata from 'components/PageMetadata';
import getCities from 'lib/city/getCities';
import { CustomPage } from 'types/customPage';

const CitiesPage: CustomPage = () => {
  const [selected, setSelected] = useTableSelection('single');
  const { errorAlert } = useAlert();

  const { data } = useQuery(
    ['getCities'],
    () => {
      return getCities();
    },
    {
      onError: error => {
        errorAlert(formatErrorMessage(error));
      },
    },
  );

  return (
    <Container maxWidth="xl">
      <PageMetadata title="Cidades" />
      <HeaderTitle title="Cidades">
        <Button variant="contained" color="success" onClick={() => Router.push('/admin/cities/create')}>
          <FaPlus style={{ marginRight: '10px' }} /> Nova cidade
        </Button>
      </HeaderTitle>
      <DataTable
        selectType="single"
        selected={selected}
        setSelected={setSelected}
        columns={[
          {
            label: 'Nome',
            prop: 'name',
          },
          {
            label: 'Estado',
            prop: 'state.name',
          },
        ]}
        data={data || []}
        singleSelectedToolbar={
          <FlexAlignRight>
            <Tooltip title="Editar" sx={{ mr: 1 }}>
              <IconButton onClick={() => Router.push(`/admin/cities/${selected}`)}>
                <FaPencilAlt size="20" />
              </IconButton>
            </Tooltip>
          </FlexAlignRight>
        }
      />
    </Container>
  );
};

CitiesPage.layout = Layout;

export default CitiesPage;
