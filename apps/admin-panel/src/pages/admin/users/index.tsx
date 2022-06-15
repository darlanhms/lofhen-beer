import { Container } from '@mui/system';
import Layout from 'components/Layout';
import PageMetadata from 'components/PageMetadata';
import { CustomPage } from 'types/customPage';
import { DataTable, FlexAlignRight, Input, useAlert, useArrayQuery, useTableSelection } from '@lofhen/ui-kit';
import { Role, UserDTO } from '@lofhen/types';
import { FaPencilAlt, FaPlus, FaTrashAlt, FaSearch } from 'react-icons/fa';
import HeaderTitle from 'components/HeaderTitle';
import { Button, IconButton, Tooltip } from '@mui/material';
import Router from 'next/router';
import { useQuery } from 'react-query';
import { getUsers } from 'lib/user/getUsers';
import { formatErrorMessage } from '@lofhen/utils';
import { useMemo } from 'react';

const getUserRoleLabel = (user: UserDTO): string => {
  switch (user.role) {
    case Role.ADMIN:
      return 'Administrador';
    case Role.AGENT:
      return 'Representante';
    default:
      return '';
  }
};

const UsersPage: CustomPage = () => {
  const [selected, setSelected] = useTableSelection('single');
  const { errorAlert } = useAlert();

  const { data } = useQuery(
    ['getUsers'],
    () => {
      return getUsers();
    },
    {
      onError: error => {
        errorAlert(formatErrorMessage(error));
      },
    },
  );

  const [filteredUsers, handleSearch] = useArrayQuery(data || [], ['username', 'name', 'role']);

  const users = useMemo(() => {
    return filteredUsers.map(user => ({
      ...user,
      role: getUserRoleLabel(user),
    }));
  }, [filteredUsers]);

  return (
    <Container maxWidth="xl">
      <PageMetadata title="Usuários" />
      <HeaderTitle title="Usuários">
        <Button variant="contained" color="success" onClick={() => Router.push('/admin/users/create')}>
          <FaPlus style={{ marginRight: '10px' }} /> Novo usuário
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
            label: 'Usuário',
            prop: 'username',
          },
          {
            label: 'Cargo',
            prop: 'role',
          },
        ]}
        data={users}
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
              <IconButton onClick={() => Router.push(`/admin/users/update/${selected}`)}>
                <FaPencilAlt size="20" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Remover">
              <IconButton>
                <FaTrashAlt size="20" />
              </IconButton>
            </Tooltip>
          </FlexAlignRight>
        }
      />
    </Container>
  );
};

UsersPage.layout = Layout;

export default UsersPage;
