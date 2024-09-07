'use client';

import { Paper } from '@mui/material';
import React from 'react';
import BookingTable from './components/table/BookingTable';

function Company() {
  return (
    <Paper sx={{ borderRadius: '10px' }} className=" py-14 px-8">
      <BookingTable />
    </Paper>
  );
}

export default Company;
