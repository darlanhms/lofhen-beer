import Router from 'next/router';
import { useQuery } from 'react-query';
import { FaPlus, FaPencilAlt, FaSearch } from 'react-icons/fa';
import { DataTable, FlexAlignRight, Input, useAlert, useArrayQuery, useTableSelection } from '@lofhen/ui-kit';
import { formatErrorMessage } from '@lofhen/utils';
import { Button, Container, IconButton, Tooltip } from '@mui/material';
import HeaderTitle from 'components/HeaderTitle';
import Layout from 'components/Layout';
import PageMetadata from 'components/PageMetadata';
import getAddresses from 'lib/address/getAddresses';
import { CustomPage } from 'types/customPage';

const AddressesPage: CustomPage = () => {
  const [selected, setSelected] = useTableSelection('single');
  const { errorAlert } = useAlert();

  const { data = [] } = useQuery(
    ['getAddresses'],
    () => {
      return getAddresses();
    },
    {
      onError: error => {
        errorAlert(formatErrorMessage(error));
      },
    },
  );

  const [filteredAddresses, handleSearch] = useArrayQuery(data, ['alias']);

  return (
    <Container maxWidth="xl">
      <PageMetadata title="Endereços" />
      <HeaderTitle title="Endereços">
        <Button variant="contained" color="success" onClick={() => Router.push('/admin/addresses/create')}>
          <FaPlus style={{ marginRight: '10px' }} /> Novo endereço
        </Button>
      </HeaderTitle>
      <DataTable
        selectType="single"
        selected={selected}
        setSelected={setSelected}
        columns={[
          {
            label: 'Apelido',
            prop: 'alias',
          },
          {
            label: 'Cidade',
            prop: 'city.name',
          },
        ]}
        data={filteredAddresses}
        headerToolbar={
          <FlexAlignRight>
            <Input
              placeholder="Pesquisar"
              sx={{ mt: 2 }}
              onChange={e => handleSearch(e.target.value)}
              adornmentIcon={<FaSearch size={18} />}
              adornmentPosition="end"
              fullWidth={false}
            />
          </FlexAlignRight>
        }
        singleSelectedToolbar={
          <FlexAlignRight>
            <Tooltip title="Editar" sx={{ mr: 1 }}>
              <IconButton onClick={() => Router.push(`/admin/users/${selected}`)}>
                <FaPencilAlt size="20" />
              </IconButton>
            </Tooltip>
          </FlexAlignRight>
        }
      />
    </Container>
  );
};

AddressesPage.layout = Layout;

export default AddressesPage;
