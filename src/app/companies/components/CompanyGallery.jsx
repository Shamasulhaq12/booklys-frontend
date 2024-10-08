/* eslint-disable no-unused-vars */
import React from 'react';
import { Box } from '@mui/material';
import Image from 'next/image';
import PropTypes from 'prop-types';
import ReactImageGallery from 'react-image-gallery';
import dummyImage from '@/assets/dummyImage.png';

function CompanyGallery({ images = [] }) {
  return (
    <Box className=" mt-6">
      <Image src={images?.length > 0 ? images[0].image : dummyImage.src} alt="Logo" width={250} height={250} />
    </Box>
  );
}

CompanyGallery.propTypes = {
  images: PropTypes.array,
};

export default CompanyGallery;
