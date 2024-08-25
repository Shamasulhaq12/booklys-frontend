/* eslint-disable no-unused-vars */

'use client';

import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import CompanyTableHead from './CompanyTableHead';
import { companyTableHeadCells } from '../../utilities/data';
import withTable from '@/HOC/withTable';
import EmptyRecordTable from '@/app/common/components/EmptyRecordTable';
import TableLoaders from '@/app/common/loaders/TableLoaders';
import { useGetCompanyQuery } from '@/services/private/company';

function CompanyTable({
  pagination,
  sorting,
  onPageChange,
  onRowsPerPageChange,
  onRequestSort,
  isSelected,
  onSelectAllRows,
  selected,
}) {
  const router = useRouter();
  const { order, orderBy } = sorting;
  const { rowsPerPage, page } = pagination;
  const { data, isLoading, isFetching } = useGetCompanyQuery({
    offset: page * rowsPerPage,
    page: page + 1,
    limit: rowsPerPage,
  });

  const loading = isLoading || isFetching;
  return (
    <TableContainer>
      <Table>
        <CompanyTableHead
          headings={companyTableHeadCells}
          order={order}
          orderBy={orderBy}
          onRequestSort={onRequestSort}
          rowCount={data?.count || 0}
          numSelected={selected?.length}
          onSelectAllRows={e => onSelectAllRows(e, data?.results)}
        />

        {loading && <TableLoaders />}

        {!loading && data?.length > 0 && (
          <TableBody>
            {data?.map(item => {
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
                    <Typography variant="body1">{item?.email}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{item?.phone}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{item?.address}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1">{`${item?.company_description?.slice(0, 20)}...`}</Typography>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        )}
        {!loading && data?.length === 0 && <EmptyRecordTable colSpan={7} />}
      </Table>

      <TablePagination
        component={Box}
        count={data?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        rowsPerPageOptions={[10, 20, 30]}
        onRowsPerPageChange={onRowsPerPageChange}
        onPageChange={onPageChange}
      />
    </TableContainer>
  );
}

CompanyTable.propTypes = {
  pagination: PropTypes.object.isRequired,
  sorting: PropTypes.object.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  isSelected: PropTypes.func.isRequired,
  onSelectAllRows: PropTypes.func.isRequired,
  selected: PropTypes.array.isRequired,
};

export default withTable(CompanyTable, { sortBy: 'id' });
