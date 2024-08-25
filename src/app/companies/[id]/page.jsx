/* eslint-disable no-unused-vars */

'use client';

import { useParams } from 'next/navigation';
import React from 'react';
import { Box, Breadcrumbs, Container, Divider, Rating, Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import Image from 'next/image';
import { useGetPublicCompanyByIdQuery, useGetPublicServiceQuery } from '@/services/public/companyServices';
import dummyImage from '@/assets/dummyImage.png';
import { border } from '@/styles/common/colors';
import ServiceItemGrid from '../components/ServiceItemGrid';
import StaffItemGrid from '../components/StaffItemGrid';
import AboutBusiness from '../components/AboutBusiness';
import CompanyGallery from '../components/CompanyGallery';

function Company() {
  const { id: paramsId } = useParams();
  console.log('paramsId', paramsId);

  const { data: companyData } = useGetPublicCompanyByIdQuery(paramsId);
  const { data: serviceData } = useGetPublicServiceQuery({ company: paramsId });
  console.log('companyData ==> ', companyData);
  console.log('serviceData ==> ', serviceData);

  return (
    <Container variant="portal" sx={{ marginTop: '70px' }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography className=" font-semibold" color="inherit">
          Home
        </Typography>
        <Typography className=" text-normal font-semibold text-themeSecondary">
          {companyData?.name}
        </Typography>
      </Breadcrumbs>
      <Grid2 container columnSpacing={20} mt={5}>
        <Grid2 xs={12} md={7}>
          <Box>
            <Typography variant="h3" className=" font-bold">
              {companyData?.name}
            </Typography>
            <Box sx={{ display: 'flex', gap: '5px', marginTop: '10px', alignItems: 'center' }}>
              <Typography variant="h6" className=" font-semibold">
                4
              </Typography>
              <Rating value={4} readOnly />
            </Box>
            <Box sx={{ display: 'flex', gap: '5px', marginTop: '4px' }}>
              <Typography variant="h6" className=" text-grey uppercase font-semibold">
                {companyData?.address}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ borderColor: border }} className="my-6" />

          <Box>
            <Typography variant="h6" className="font-semibold">
              {companyData?.company_description}
            </Typography>
          </Box>

          <Divider sx={{ borderColor: border }} className="my-6" />

          <Box mt={8}>
            <Typography variant="h3" className=" font-bold">
              Book a service
            </Typography>
            <Box className="mt-6">
              <ServiceItemGrid />
            </Box>
          </Box>
          <Box mt={8}>
            <Typography variant="h3" className=" font-bold">
              Staff
            </Typography>
            <Box className="mt-6">
              <StaffItemGrid />
              <Divider sx={{ borderColor: border }} className="my-3" />
            </Box>
          </Box>
          <AboutBusiness />
          <Box mt={8}>
            <Typography variant="h3" className=" font-bold">
              Pictures
            </Typography>
            <Box className="mt-6">
              <CompanyGallery />
            </Box>
          </Box>
        </Grid2>
        <Grid2 xs={12} md={5}>
          <Image
            src={
              companyData?.company_images?.length > 0 ? companyData?.company_images[0].src : dummyImage.src
            }
            alt="Logo"
            width={400}
            height={400}
          />
          <Typography variant="h6" className=" font-bold mt-3">Details and contact information</Typography>
        </Grid2>
      </Grid2>
    </Container>
  );
}

export default Company;
