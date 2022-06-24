import { useMemo } from 'react';
import Router from 'next/router';
import { useQuery } from 'react-query';
import { FaPlus, FaPencilAlt, FaSearch } from 'react-icons/fa';
import { FiExternalLink } from 'react-icons/fi';
import { DataTable, FlexAlignRight, Input, useAlert, useArrayQuery, useTableSelection } from '@lofhen/ui-kit';
import { formatErrorMessage } from '@lofhen/utils';
import { Button, Chip, Container, IconButton, Tooltip } from '@mui/material';
import HeaderTitle from 'components/HeaderTitle';
import Layout from 'components/Layout';
import PageMetadata from 'components/PageMetadata';
import getAddresses from 'lib/address/getAddresses';
import { CustomPage } from 'types/customPage';

interface EnabledChipProps {
  enabled: boolean;
}

const EnabledChip: React.FunctionComponent<EnabledChipProps> = ({ enabled }) => {
  if (enabled) {
    return <Chip color="success" variant="outlined" label="Sim" />;
  }

  return <Chip color="error" variant="outlined" label="Não" />;
};

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

  const addresses = useMemo(() => {
    return filteredAddresses.map(address => ({
      ...address,
      link: address.link ? (
        <div style={{ display: 'flex' }}>
          <a href={address.link} target="_blank" onClick={e => e.stopPropagation()} rel="noreferrer">
            Link externo
          </a>
          <FiExternalLink style={{ marginLeft: '3px', marginTop: '4px' }} />
        </div>
      ) : null,
      enabled: <EnabledChip enabled={address.enabled} />,
    }));
  }, [filteredAddresses]);

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
          {
            label: 'Link',
            prop: 'link',
          },
          {
            label: 'Bairro',
            prop: 'neighborhood',
          },
          {
            label: 'Rua',
            prop: 'street',
          },
          {
            label: 'Número',
            prop: 'number',
          },
          {
            label: 'Ativo',
            prop: 'enabled',
            alignment: 'center',
          },
        ]}
        data={addresses}
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
              <IconButton onClick={() => Router.push(`/admin/addresses/${selected}`)}>
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
