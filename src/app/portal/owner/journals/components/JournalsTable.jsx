/* eslint-disable no-unused-vars */

'use client';

import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Checkbox,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { Edit } from '@mui/icons-material';
import withTable from '@/HOC/withTable';
import useGetUserRoles from '@/customHooks/useGetUserRoles';
import { useGetServiceQuery } from '@/services/private/services';
import TableLoaders from '@/app/common/loaders/TableLoaders';
import EmptyRecordTable from '@/app/common/components/EmptyRecordTable';
import { journalTableHeadCells } from '../utilities/data';
import JournalsTableHead from './JournalsTableHead';
import { useGetJournalsQuery } from '@/services/private/journals';
import ModalHeader from '@/app/common/components/ModalHeader';
import AddEditJournalForm from './form/AddEditJournalForm';
import { formModalStyles } from '@/styles/mui/common/modal-styles';

function JournalsTable({
  pagination,
  sorting,
  onPageChange,
  onRowsPerPageChange,
  onRequestSort,
  isSelected,
  onSelectAllRows,
  onSelectRow,
  selected,
  setSelected,
}) {
  const [isModalOpen, setModalOpen] = useState(false);

  const router = useRouter();
  const { isSupplier } = useGetUserRoles();
  const { order, orderBy } = sorting;
  const { rowsPerPage, page } = pagination;
  const { data, isLoading, isFetching } = useGetJournalsQuery({
    offset: page * rowsPerPage,
    page: page + 1,
    limit: rowsPerPage,
  });

  const loading = isLoading || isFetching;

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <>
      <TableContainer>
        <Table>
          <JournalsTableHead
            headings={journalTableHeadCells}
            order={order}
            orderBy={orderBy}
            onRequestSort={onRequestSort}
            rowCount={data?.count || 0}
            numSelected={selected?.length}
            onSelectAllRows={e => onSelectAllRows(e, data?.results)}
          />

          {loading && <TableLoaders />}

          {!loading && data?.results?.length > 0 && (
          <TableBody>
            {data?.results?.map(item => {
              const isItemSelected = isSelected(item?.id);

              return (
                <TableRow
                  hover
                  selected={isItemSelected}
                  className=" cursor-pointer"
                  // onClick={() => router.push(`/portal/orders/detail/${item?.order_number}`)}
                  key={item?.id}
                >
                  <TableCell>
                    <Typography variant="body1">{item?.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{item?.phone}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{item?.email}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{item?.price}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{item?.owner}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{item?.description}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">
                      <IconButton
                        onClick={() => {
                          toggleModal();
                          onSelectRow(item);
                        }}
                        title="Edit"
                        size="small"
                      >
                        <Edit />
                      </IconButton>
                    </Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          )}
          {!loading && data?.results?.length === 0 && <EmptyRecordTable colSpan={7} />}
        </Table>

        <TablePagination
          component={Box}
          count={data?.results?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          rowsPerPageOptions={[10, 20, 30]}
          onRowsPerPageChange={onRowsPerPageChange}
          onPageChange={onPageChange}
        />
      </TableContainer>
      <Modal open={isModalOpen} onClose={toggleModal}>
        <Box sx={{ ...formModalStyles, width: '900px', height: '100vh' }}>
          <ModalHeader title="New basic service" onClose={toggleModal} />
          <AddEditJournalForm journalData={selected[0]} toggleModal={toggleModal} />
        </Box>
      </Modal>
    </>
  );
}

JournalsTable.propTypes = {
  pagination: PropTypes.object.isRequired,
  sorting: PropTypes.object.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  isSelected: PropTypes.func.isRequired,
  onSelectAllRows: PropTypes.func.isRequired,
  onSelectRow: PropTypes.func.isRequired,
  selected: PropTypes.array.isRequired,
  setSelected: PropTypes.func.isRequired,
};

export default withTable(JournalsTable, { sortBy: 'id' });
