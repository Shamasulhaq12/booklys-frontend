/* eslint-disable no-unused-vars */
import { PinDropOutlined } from '@mui/icons-material';
import { Avatar, Box, Chip, Rating, Typography } from '@mui/material';
import Image from 'next/image';
import PropTypes from 'prop-types';
import Link from 'next/link';
import React from 'react';
import dummyImage from '@/assets/dummyImage.png';

function AppointmentCard({ title = '', images = '', id = '', description = '', address = '' }) {
  return (
    <Link href={`/companies/${id}`}>
      <Box className=" hover:bg-sky-100 flex justify-between items-center transition-all duration-300 cursor-pointer p-3">
        <Box className=" flex items-center gap-3">
          <Avatar src="" sx={{ borderRadius: '10px', width: '56px', height: '56px' }} />
          <Box className=" flex flex-col gap-3">
            <Chip label="BOOKED" color="success" />
            <Typography variant="h6" className=" font-semibold">
              Company Name
            </Typography>
            <Typography variant="body1" className="font-semibold text-sm text-grey">
              Date
            </Typography>
            <Typography variant="body1" className="font-semibold text-base text-grey">
              Service Name
            </Typography>
          </Box>
        </Box>
      </Box>
    </Link>
  );
}

AppointmentCard.propTypes = {
  title: PropTypes.string,
  images: PropTypes.string,
  description: PropTypes.string,
  address: PropTypes.string,
  id: PropTypes.number,
};

export default AppointmentCard;
