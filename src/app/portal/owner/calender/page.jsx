'use client';

import React, { useState } from 'react';
import { Box, Modal } from '@mui/material';
import Calendar from './components/Calendar';
import ModalHeader from '@/app/common/components/ModalHeader';
import { formModalStyles } from '@/styles/mui/common/modal-styles';
import BookingModalBody from './components/BookingModalBody';
import { useGetCalenderBookingsQuery } from '@/services/private/calender';

function BookingCalender() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  // API HOOKS & TRANSFORMER HOOKS
  const { data: calenderEvents } = useGetCalenderBookingsQuery();

  const modifiedCalenderEvents = (calenderEvents?.length > 0 && calenderEvents !== null)
    ?
    calenderEvents.map(booking => ({
      id: booking.id,
      title: booking.service__service_name,
      description: booking.booking_status,
      start: new Date(booking.start_booking_slot),
      end: new Date(booking.end_booking_slot),
      allDay: false,
      event_index: 2,
      priority: 'non',
    })) : [];

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

      <Calendar small={false} events={modifiedCalenderEvents} onSelectEvent={handleSelectBooking} />
    </Box>
  );
}

export default BookingCalender;
