import React, { useState } from 'react';
import dot from 'dot-object';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

type GenericRowType = {
  id: string;
  [key: string]: any;
};

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
export interface ColumnConfig {
  prop: string;
  label: string;
  numeric?: boolean;
  alignment?: 'right' | 'left' | 'center';
}

interface EnhancedTableHeadProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string | undefined;
  rowCount: number;
  headCells: Array<ColumnConfig>;
  selectType: 'single' | 'multi' | 'none';
}

function EnhancedTableHead(props: EnhancedTableHeadProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, selectType, onRequestSort } = props;

  const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {selectType !== 'none' && (
          <TableCell padding="checkbox">
            {selectType === 'multi' && (
              <Checkbox
                color="primary"
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={rowCount > 0 && numSelected === rowCount}
                onChange={onSelectAllClick}
                inputProps={{
                  'aria-label': 'select all desserts',
                }}
              />
            )}
          </TableCell>
        )}
        {props.headCells.map(headCell => (
          <TableCell
            key={headCell.prop}
            align={headCell.alignment}
            padding="normal"
            sortDirection={orderBy === headCell.prop ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.prop}
              direction={orderBy === headCell.prop ? order : 'asc'}
              onClick={createSortHandler(headCell.prop)}
            >
              {headCell.label}
              {orderBy === headCell.prop ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface ActualToolbarProps {
  numSelected: number;
  singleSelectedToolbar: React.ReactNode;
  multiSelectedToolbar: React.ReactNode;
  headerToolbar: React.ReactNode;
}

const ActualToolbar = (props: ActualToolbarProps): React.ReactElement => {
  const { numSelected, headerToolbar, singleSelectedToolbar, multiSelectedToolbar } = props;

  if (numSelected === 0 && headerToolbar) {
    return <>{headerToolbar}</>;
  }

  if (numSelected > 0 && numSelected === 1 && singleSelectedToolbar) {
    return <>{singleSelectedToolbar}</>;
  }

  if (numSelected > 0 && multiSelectedToolbar) {
    return <>{multiSelectedToolbar}</>;
  }

  return <></>;
};

interface EnhancedTableToolbarProps {
  numSelected: number;
  singleSelectedToolbar?: React.ReactNode;
  multiSelectedToolbar?: React.ReactNode;
  headerToolbar?: React.ReactNode;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const { numSelected, singleSelectedToolbar, multiSelectedToolbar, headerToolbar } = props;

  return (
    <Toolbar
      sx={{
        height: '70px',
        px: 1,
        ...(numSelected > 0 && {
          bgcolor: theme => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      <ActualToolbar
        numSelected={numSelected}
        singleSelectedToolbar={singleSelectedToolbar}
        multiSelectedToolbar={multiSelectedToolbar}
        headerToolbar={headerToolbar}
      />
    </Toolbar>
  );
};

interface MultiSelectTableProps {
  selectType: 'multi';
  selected: ReadonlyArray<GenericRowType['id']>;
  setSelected: React.Dispatch<React.SetStateAction<ReadonlyArray<GenericRowType['id']>>>;
}
interface SingleSelectTableProps {
  selectType: 'single';
  selected: GenericRowType['id'] | undefined;
  setSelected: React.Dispatch<React.SetStateAction<GenericRowType['id'] | undefined>>;
}

interface NoSelectTableProps {
  selectType: 'none';
}

type SelectTableProps = MultiSelectTableProps | SingleSelectTableProps | NoSelectTableProps;

interface GeneralTableProps {
  data: Array<{
    id: any;
    [key: string]: any;
  }>;
  columns: Array<ColumnConfig>;
  headerToolbar?: React.ReactNode;
  singleSelectedToolbar?: React.ReactNode;
  multiSelectedToolbar?: React.ReactNode;
}

export type DataTableProps = GeneralTableProps & SelectTableProps;

export function DataTable(props: DataTableProps): React.ReactElement {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<string | undefined>();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { data, selectType, columns } = props;

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: string) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (props.selectType === 'multi') {
      if (event.target.checked) {
        const newSelected = data.map(n => n.id);
        props.setSelected(newSelected);
        return;
      }

      props.setSelected([]);
    }
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: GenericRowType['id']) => {
    if (selectType === 'multi') {
      const { selected, setSelected } = props;

      const selectedIndex = selected.indexOf(id);
      let newSelected: ReadonlyArray<GenericRowType['id']> = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
      }

      setSelected(newSelected);
    } else if (selectType === 'single') {
      const { selected, setSelected } = props;

      if (selected === id) {
        setSelected(undefined);
      } else {
        setSelected(id);
      }
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getSlicedRows = () => {
    if (orderBy) {
      return data
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }

    return data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  };

  const numSelected =
    // eslint-disable-next-line no-nested-ternary
    selectType === 'multi' ? props.selected.length : selectType === 'single' && props.selected ? 1 : 0;

  const isSelected = (id: string) => {
    if (props.selectType === 'multi') {
      return props.selected.indexOf(id) !== -1;
    }

    if (props.selectType === 'single') {
      return props.selected === id;
    }

    return false;
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={numSelected}
          headerToolbar={props.headerToolbar}
          multiSelectedToolbar={props.multiSelectedToolbar}
          singleSelectedToolbar={props.singleSelectedToolbar}
        />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
            <EnhancedTableHead
              numSelected={numSelected}
              order={order}
              orderBy={orderBy}
              headCells={columns}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
              selectType={selectType}
            />
            <TableBody>
              {getSlicedRows().map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={event => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    {selectType !== 'none' && (
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                    )}
                    {columns.map(column => (
                      <TableCell key={`${column.prop}_${row.id}`} align={column.alignment || 'left'}>
                        {dot.pick(column.prop, row)}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          labelRowsPerPage="Linhas por página"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
