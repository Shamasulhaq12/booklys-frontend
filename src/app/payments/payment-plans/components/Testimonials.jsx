import { Box, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import React from 'react';
import TestimonialsCards from './TestimonialsCards';

function Testimonials() {
  return (
    <Box className=" bg-[#f0e6f2] flex flex-col justify-center items-center py-20 px-5">
      <Typography variant="h3" className=" normal-case my-2 font-semibold text-center">
        Vad våra användare säger om Booklyz
      </Typography>
      <Grid2
        mt={3}
        className=" max-w-[1024px] "
        container
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid2 xs={12} md={4}>
          <TestimonialsCards alignItems="left" textAlign="left" />
        </Grid2>
        <Grid2 xs={12} md={4}>
          <TestimonialsCards alignItems="left" textAlign="left" />
        </Grid2>
        <Grid2 xs={12} md={4}>
          <TestimonialsCards alignItems="left" textAlign="left" />
        </Grid2>
        <Grid2 xs={12} md={4}>
          <TestimonialsCards alignItems="left" textAlign="left" />
        </Grid2>
        <Grid2 xs={12} md={4}>
          <TestimonialsCards alignItems="left" textAlign="left" />
        </Grid2>
        <Grid2 xs={12} md={4}>
          <TestimonialsCards alignItems="left" textAlign="left" />
        </Grid2>
      </Grid2>
    </Box>
  );
}

export default Testimonials;
