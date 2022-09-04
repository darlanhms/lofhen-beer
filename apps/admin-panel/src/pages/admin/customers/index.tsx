import { useMemo } from 'react';
import Router from 'next/router';
import { FaPlus, FaPencilAlt, FaSearch } from 'react-icons/fa';
import { DataTable, FlexAlignRight, Input, useArrayQuery, useTableSelection } from '@lofhen/ui-kit';
import { applyPhoneMask } from '@lofhen/utils';
import { Button, Container, IconButton, Tooltip } from '@mui/material';
import HeaderTitle from 'components/HeaderTitle';
import Layout from 'components/Layout';
import PageMetadata from 'components/PageMetadata';
import { format } from 'date-fns';
import useCustomers from 'lib/customer/useCustomers';
import { CustomPage } from 'types/customPage';

const CustomersPage: CustomPage = () => {
  const [selected, setSelected] = useTableSelection('single');

  const { data = [] } = useCustomers();

  const formattedCustomers = useMemo(() => {
    return data.map(customer => ({
      ...customer,
      birthdate: customer.birthdate ? format(new Date(customer.birthdate), 'dd/MM') : '',
      phone: customer.phone ? applyPhoneMask(customer.phone) : '',
    }));
  }, [data]);

  const [filteredCustomers, handleSearch] = useArrayQuery(formattedCustomers, ['name', 'phone', 'birthdate']);

  return (
    <Container maxWidth="xl">
      <PageMetadata title="Clientes" />
      <HeaderTitle title="Clientes">
        <Button variant="contained" color="success" onClick={() => Router.push('/admin/customers/create')}>
          <FaPlus style={{ marginRight: '10px' }} /> Novo cliente
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
            label: 'Fone',
            prop: 'phone',
          },
          {
            label: 'Aniversário.',
            prop: 'birthdate',
          },
        ]}
        data={filteredCustomers}
        singleSelectedToolbar={
          <FlexAlignRight>
            <Tooltip title="Editar" sx={{ mr: 1 }}>
              <IconButton onClick={() => Router.push(`/admin/customers/${selected}`)}>
                <FaPencilAlt size="20" />
              </IconButton>
            </Tooltip>
          </FlexAlignRight>
        }
        headerToolbar={
          <FlexAlignRight>
            <Input
              placeholder="Pesquisar..."
              sx={{ mt: 2 }}
              onChange={e => handleSearch(e.target.value)}
              adornmentIcon={<FaSearch size={18} />}
              adornmentPosition="end"
              fullWidth={false}
            />
          </FlexAlignRight>
        }
      />
    </Container>
  );
};

CustomersPage.layout = Layout;

export default CustomersPage;
