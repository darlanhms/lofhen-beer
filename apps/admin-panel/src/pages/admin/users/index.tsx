import { useMemo, useState } from 'react';
import Router from 'next/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { FaPencilAlt, FaPlus, FaTrashAlt, FaSearch } from 'react-icons/fa';
import { Role, UserDTO } from '@lofhen/types';
import { DataTable, FlexAlignRight, Input, useAlert, useArrayQuery, useTableSelection } from '@lofhen/ui-kit';
import { formatErrorMessage } from '@lofhen/utils';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Container } from '@mui/system';
import HeaderTitle from 'components/HeaderTitle';
import Layout from 'components/Layout';
import PageMetadata from 'components/PageMetadata';
import { deleteUser } from 'lib/user/deleteUser';
import { getUsers } from 'lib/user/getUsers';
import { CustomPage } from 'types/customPage';

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
  const [modalOpen, setModalOpen] = useState(false);
  const { errorAlert } = useAlert();
  const queryClient = useQueryClient();

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

  const deleteUserMutation = useMutation(
    async () => {
      if (selected) {
        return deleteUser(selected);
      }

      return null;
    },
    {
      onError: error => {
        errorAlert(formatErrorMessage(error));
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['getUsers']);
        setModalOpen(false);
        setSelected(undefined);
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

  const getCurrentUser = (): UserDTO | undefined => {
    return data?.find(user => user.id === selected);
  };

  const handleRemoveUser = () => {
    deleteUserMutation.mutate();
  };

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
              <IconButton onClick={() => Router.push(`/admin/users/${selected}`)}>
                <FaPencilAlt size="20" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Remover">
              <IconButton onClick={() => setModalOpen(true)}>
                <FaTrashAlt size="20" />
              </IconButton>
            </Tooltip>
          </FlexAlignRight>
        }
      />

      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogTitle>Confirmar exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza que deseja remover o usuário <b>{getCurrentUser()?.name}</b>?
            <br />
            Essa ação não pode ser desfeita
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={() => setModalOpen(false)}>
            Cancelar
          </Button>
          <Button color="success" onClick={handleRemoveUser} autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

UsersPage.layout = Layout;

export default UsersPage;
