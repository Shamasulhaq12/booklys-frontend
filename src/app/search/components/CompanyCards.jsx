/* eslint-disable no-unused-vars */
import { PinDropOutlined } from '@mui/icons-material';
import { Box, Rating, Typography } from '@mui/material';
import Image from 'next/image';
import PropTypes from 'prop-types';
import Link from 'next/link';
import React from 'react';
import dummyImage from '@/assets/dummyImage.png';
import categoryImage from '@/assets/category-img.webp';
import { placeholderImage } from '@/utilities/constants';

function CompanyCards({ title = '', images = '', id = '', description = '', address = '' }) {
  return (
    <Link href={`/companies/${id}`}>
      <Box className=" shadow-md border rounded-xl my-5" sx={{ display: 'flex', gap: '20px', overflow: 'hidden' }}>
        <Image src={images?.length > 0 ? images[0].image : dummyImage.src} alt="Logo" width={400} height={400} />
        <Box className="py-3">
          <Typography variant="h5" className=" font-semibold">
            {title}
          </Typography>
          <Box sx={{ display: 'flex', gap: '20px', marginTop: '12px' }}>
            <Image
              src={images?.length > 0 ? images[0].image : dummyImage.src}
              className=" shadow-md rounded-xl"
              alt="dummyImage"
              width={100}
              height={100}
            />
            <Box sx={{ display: 'flex', gap: '6px', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', gap: '5px' }}>
                <PinDropOutlined />
                <Typography variant="body1" className=" font-medium">
                  {address}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: '5px' }}>
                <Typography variant="body1" className=" font-medium">
                  4
                </Typography>
                <Rating value={4} readOnly />
              </Box>
            </Box>
          </Box>
          <Box sx={{ marginTop: '16px' }}>
            <Typography variant="body1" className="font-bold text-grey">
              {description}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Link>
  );
}

CompanyCards.propTypes = {
  title: PropTypes.string,
  images: PropTypes.string,
  description: PropTypes.string,
  address: PropTypes.string,
  id: PropTypes.number,
};

export default CompanyCards;
