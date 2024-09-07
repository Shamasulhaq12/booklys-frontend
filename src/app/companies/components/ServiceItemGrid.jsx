/* eslint-disable no-unused-vars */
import { Box, Button, Modal, Typography } from '@mui/material';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';
import { formModalStyles } from '@/styles/mui/common/modal-styles';
import ModalHeader from '@/app/common/components/ModalHeader';
import ServiceDetail from './ServiceDetail';
import { useLazyAuthorizedQuery } from '@/services/private/auth';

function ServiceItemGrid({ title = '', price = '', timing = '', id = null }) {
  const [isModalOpen, setModalOpen] = useState(false);

  const router = useRouter();

  // Query
  const [authorizeLoggedin] = useLazyAuthorizedQuery();

  const toggleModal = async () => {
    const response = await authorizeLoggedin();

    if (!response?.error) {
      setModalOpen(!isModalOpen);
    } else {
      router.push('/auth/signin');
    }
  };
  return (
    <Box className=" hover:bg-sky-100 flex justify-between items-center transition-all duration-300 cursor-pointer p-3">
      <Box>
        <Typography variant="h6" className="font-semibold">
          {title}
        </Typography>
        <Box className=" flex justify-between item-baseline gap-3">
          <Typography variant="h6" className=" text-grey font-semibold">
            {timing}min, DKK {price}
          </Typography>
          <Typography variant="h6" className=" text-sky-700 underline font-semibold">
            More Info
          </Typography>
        </Box>
      </Box>
      <Box>
        <Button onClick={toggleModal} variant="contained" className=" bg-dark">
          Book Now
        </Button>
      </Box>
      <Modal open={isModalOpen} onClose={toggleModal}>
        <Box sx={{ ...formModalStyles, width: '600px' }}>
          <ModalHeader title="Selected Service" onClose={toggleModal} />
          <ServiceDetail title={title} price={price} timing={timing} id={id} />
        </Box>
      </Modal>
    </Box>
  );
}

ServiceItemGrid.propTypes = {
  title: PropTypes.string,
  price: PropTypes.string,
  timing: PropTypes.string,
  id: PropTypes.number,
};

export default ServiceItemGrid;
