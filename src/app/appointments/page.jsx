import { Box, Button, Container, Typography } from '@mui/material';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import bookings from '@/assets/no-bookings1.svg';

function Appointments() {
  return (
    <Container variant="portal" sx={{ marginTop: '20px' }}>
      <Box className=" pt-10">
        <Box className=" flex flex-col justify-center items-center">
          <Image src={bookings.src} alt="Logo" width={300} height={300} />
          <Box className="flex flex-col justify-center items-center mt-6">
            <Typography variant="h5" className=" font-semibold">
              No services booked
            </Typography>
            <Typography variant="body1" className=" font-normal mt-2">
              When you have booked a service, it will appear here
            </Typography>
            <Link href="/">
              <Button variant="contained" color="primary" className=" uppercase mt-5">
                Book A Service
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default Appointments;
