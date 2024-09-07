/* eslint-disable no-unused-vars */
import React from 'react';
import propTypes from 'prop-types';
import { Checkbox, TableCell, TableHead, TableRow, TableSortLabel, Typography } from '@mui/material';

function JournalsTableHead({ headings, order, orderBy, onSelectAllRows, onRequestSort, numSelected, rowCount }) {
  return (
    <TableHead className=" bg-gray-100 rounded-3xl" sx={{ borderRadius: '10px' }}>
      <TableRow>
        {/* <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            onClick={onSelectAllRows}
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
          />
        </TableCell> */}
        {headings?.map(cell => (
          <TableCell
            colSpan={cell?.colSpan || null}
            padding={cell?.disablePadding ? 'none' : 'normal'}
            key={cell?.id}
          >
            <TableSortLabel
              active={orderBy === cell.id}
              direction={order}
              onClick={() => onRequestSort(cell.id)}
              sx={{ whiteSpace: 'nowrap' }}
            >
              {cell?.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

JournalsTableHead.propTypes = {
  headings: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
      label: propTypes.string.isRequired,
      renderColumn: propTypes.func,
      clickable: propTypes.bool,
      disablePadding: propTypes.bool,
      colSpan: propTypes.number,
    })
  ).isRequired,
  order: propTypes.string.isRequired,
  orderBy: propTypes.string.isRequired,
  onSelectAllRows: propTypes.func.isRequired,
  onRequestSort: propTypes.func.isRequired,
  numSelected: propTypes.number,
  rowCount: propTypes.number,
};

export default JournalsTableHead;
