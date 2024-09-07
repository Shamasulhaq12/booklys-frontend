import React from 'react';
import { Box, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import HeroSection from './components/HeroSection';
import PlanCardsContainer from './components/PlanCardsContainer';
import GridItemCard from './components/GridItemCard';
import AboutUs from './components/AboutUs';
import FeatureSection from './components/FeatureSection';
import Testimonials from './components/Testimonials';
import ContactUsForm from './components/ContactUsForm';
// services and components

function Pricing() {
  return (
    <Box>
      <HeroSection />
      <Box className=" bg-skin flex justify-center items-center py-16 px-5">
        <Grid2 className=" max-w-[1024px] " container justifyContent="center" alignItems="center" spacing={4}>
          <Grid2 xs={12} md={4}>
            <GridItemCard />
          </Grid2>
          <Grid2 xs={12} md={4}>
            <GridItemCard />
          </Grid2>
          <Grid2 xs={12} md={4}>
            <GridItemCard />
          </Grid2>
        </Grid2>
      </Box>
      <AboutUs />
      <FeatureSection />
      <Box className=" bg-skin flex flex-col justify-center items-center py-24 px-5">
        <Typography variant="h2" className=" normal-case my-2 font-semibold text-center">
          Additional services
        </Typography>
        <Grid2 mt={3} className=" max-w-[1024px] " container justifyContent="center" alignItems="center" spacing={4}>
          <Grid2 xs={12} md={6}>
            <GridItemCard alignItems="left" textAlign="left" />
          </Grid2>
          <Grid2 xs={12} md={6}>
            <GridItemCard alignItems="left" textAlign="left" />
          </Grid2>
          <Grid2 xs={12} md={6}>
            <GridItemCard alignItems="left" textAlign="left" />
          </Grid2>
          <Grid2 xs={12} md={6}>
            <GridItemCard alignItems="left" textAlign="left" />
          </Grid2>
        </Grid2>
      </Box>
      <Testimonials />
      <ContactUsForm />
      <PlanCardsContainer />
    </Box>
  );
}

export default Pricing;
