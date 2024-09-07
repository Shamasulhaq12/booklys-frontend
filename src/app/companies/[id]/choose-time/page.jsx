'use client';

import React from 'react';
import { Box, Container, Divider, Typography } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { border } from '@/styles/common/colors';
import { useGetPublicServiceByIdQuery } from '@/services/public/companyServices';
import ChooseTimeForm from './components/ChooseTimeForm';

function ChooseTime() {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get('serviceId');
  const { data: serviceData } = useGetPublicServiceByIdQuery(serviceId);
  console.log('serviceId', serviceId);
  console.log('serviceData', serviceData);

  return (
    <Container variant="portal" sx={{ marginTop: '70px' }}>
      <Grid2 container columnSpacing={20} mt={5}>
        <Grid2 xs={12} md={7}>
          <Typography variant="h5" className=" font-bold">
            Choose a time
          </Typography>
          <Box className=" mt-4">
            <ChooseTimeForm serviceId={serviceId} companyId={serviceData?.company} />
          </Box>
        </Grid2>
        <Grid2 xs={12} md={5}>
          <Typography variant="body1" className=" text-grey font-semibold">
            You have chosen:
          </Typography>
          <Divider sx={{ borderColor: border }} className="my-3" />

          <Box>
            <Typography variant="body1" className=" text-grey font-semibold">
              {serviceData?.service_name}
            </Typography>
            <Box className=" mt-2 flex justify-between item-baseline gap-3">
              <Typography variant="body1" className=" text-grey font-semibold">
                {serviceData?.service_timing}min,{' '}
                <span className=" text-sky-300">DKK {serviceData?.price}</span>
              </Typography>
            </Box>
          </Box>
        </Grid2>
      </Grid2>
    </Container>
  );
}

export default ChooseTime;
