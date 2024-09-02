import { Box, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import React from 'react';
import GridItemCard from './GridItemCard';

function AboutUs() {
  return (
    <Box className=" flex justify-center items-center py-24 px-5">
      <Box className=" w-full flex flex-col justify-center items-center max-w-[1024px] ">
        <Typography variant="h2" className=" normal-case my-2 font-semibold text-center">
          Mer tid till din dröm
        </Typography>
        <Typography variant="body2" className=" leading-6 tracking-wide text-center w-[650px]">
          Online booking system with everything you need to run a business on Sweden largest marketplace for
          beauty and health. Save time and focus on what you are passionate about.
        </Typography>
        <Grid2 mt={3} container justifyContent="center" alignItems="center" spacing={4}>
          <Grid2 xs={12} md={3}>
            <GridItemCard alignItems="left" textAlign="left" />
          </Grid2>
          <Grid2 xs={12} md={3}>
            <GridItemCard alignItems="left" textAlign="left" />
          </Grid2>
          <Grid2 xs={12} md={3}>
            <GridItemCard alignItems="left" textAlign="left" />
          </Grid2>
          <Grid2 xs={12} md={3}>
            <GridItemCard alignItems="left" textAlign="left" />
          </Grid2>
          <Grid2 xs={12} md={3}>
            <GridItemCard alignItems="left" textAlign="left" />
          </Grid2>
          <Grid2 xs={12} md={3}>
            <GridItemCard alignItems="left" textAlign="left" />
          </Grid2>
          <Grid2 xs={12} md={3}>
            <GridItemCard alignItems="left" textAlign="left" />
          </Grid2>
          <Grid2 xs={12} md={3}>
            <GridItemCard alignItems="left" textAlign="left" />
          </Grid2>
        </Grid2>
      </Box>
    </Box>
  );
}

export default AboutUs;
