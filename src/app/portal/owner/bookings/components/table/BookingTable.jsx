/* eslint-disable no-unused-vars */

'use client';

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  IconButton,
  Modal,
  Stack,
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
import moment from 'moment';
import BookingTableHead from './BookingTableHead';
import { bookingTableHeadCells } from '../../utilities/data';
import withTable from '@/HOC/withTable';
import EmptyRecordTable from '@/app/common/components/EmptyRecordTable';
import TableLoaders from '@/app/common/loaders/TableLoaders';
import ModalHeader from '@/app/common/components/ModalHeader';
import AddEditCompanyForm from '../form/AddEditBookingForm';
import { formModalStyles } from '@/styles/mui/common/modal-styles';
import { useGetBookingsQuery } from '@/services/private/bookings';

function BookingTable({
  pagination,
  sorting,
  onPageChange,
  onRowsPerPageChange,
  onRequestSort,
  isSelected,
  onSelectAllRows,
  onSelectRow,
  selected,
}) {
  const router = useRouter();
  const [isAddModalOpen, setAddModalOpen] = useState(false);

  const toggleAddModal = () => {
    setAddModalOpen(!isAddModalOpen);
  };
  const { order, orderBy } = sorting;
  const { rowsPerPage, page } = pagination;

  const { data: bookingsData, isLoading, isFetching } = useGetBookingsQuery({
    offset: page * rowsPerPage,
    page: page + 1,
    limit: rowsPerPage,
  });

  const loading = isLoading || isFetching;
  return (
    <TableContainer>
      <Table className=" overflow-x-auto">
        <BookingTableHead
          headings={bookingTableHeadCells}
          order={order}
          orderBy={orderBy}
          onRequestSort={onRequestSort}
          rowCount={bookingsData?.count || 0}
          numSelected={selected?.length}
          onSelectAllRows={e => onSelectAllRows(e, bookingsData?.results)}
        />

        {loading && <TableLoaders />}

        {!loading && bookingsData?.results?.length > 0 && (
          <TableBody>

            {bookingsData.results?.map(item => {
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
                    <Typography variant="body1">{item?.booking_date}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{item?.booking_status}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{item?.payment_status ? 'Paid' : 'UnPaid'}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{item?.start_booking_slot && moment(item.start_booking_slot).format('HH:mm:ss')}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{item?.end_booking_slot && moment(item.end_booking_slot).format('HH:mm:ss')}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{item?.email}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{item?.phone}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{`${item?.booking_description?.slice(0, 20)}...`}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{item?.total_price}</Typography>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" alignItems="center" gap={1}>
                      <IconButton
                        onClick={() => {
                          toggleAddModal();
                          onSelectRow(item);
                        }}
                        title="Edit"
                        size="small"
                      >
                        <Edit />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        )}
        {!loading && bookingsData?.results?.length === 0 && <EmptyRecordTable colSpan={10} />}
      </Table>

      <TablePagination
        component={Box}
        count={bookingsData?.count || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        rowsPerPageOptions={[10, 20, 30]}
        onRowsPerPageChange={onRowsPerPageChange}
        onPageChange={onPageChange}
      />
      <Modal open={isAddModalOpen} onClose={toggleAddModal}>
        <Box sx={{ ...formModalStyles, width: '600px' }}>
          <ModalHeader title="Edit Booking" onClose={toggleAddModal} />
          <AddEditCompanyForm bookingData={selected[0]} toggleAddModal={toggleAddModal} />
        </Box>
      </Modal>
    </TableContainer>
  );
}

BookingTable.propTypes = {
  pagination: PropTypes.object.isRequired,
  sorting: PropTypes.object.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  isSelected: PropTypes.func.isRequired,
  onSelectAllRows: PropTypes.func.isRequired,
  onSelectRow: PropTypes.func.isRequired,
  selected: PropTypes.array.isRequired,
};

export default withTable(BookingTable, { sortBy: 'id' });
