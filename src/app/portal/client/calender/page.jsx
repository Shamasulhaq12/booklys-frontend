'use client';

import React, { useState } from 'react';
import { Box, Modal } from '@mui/material';
import Calendar from './components/Calendar';
import ModalHeader from '@/app/common/components/ModalHeader';
import { formModalStyles } from '@/styles/mui/common/modal-styles';
import BookingModalBody from './components/BookingModalBody';

function BookingCalender() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  // API HOOKS & TRANSFORMER HOOKS
  const data = [];

  // HANDLERS
  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const handleSelectBooking = booking => {
    setSelected(booking);
    setModalOpen(true);
  };

  return (
    <Box className="bg-white p-4">
      <Modal open={isModalOpen} onClose={toggleModal}>
        <Box sx={formModalStyles}>
          <ModalHeader title="Booking Details" onClose={toggleModal} />

          <BookingModalBody selected={selected} />
        </Box>
      </Modal>

      <Calendar small={false} events={data} onSelectEvent={handleSelectBooking} />
    </Box>
  );
}

export default BookingCalender;
