import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import image from '@/assets/category-img.webp';

function SubCategoriesCard() {
  return (
    <Box className=" h-full w-full p-1 sm:p-2 lg:p-4 basis-full sm:basis-1/2 md:basis-1/3">
      <Image src={image} alt="Category Img" width={348} height={192} className=" rounded-md" />
      <Typography variant="body1" fontWeight={500} className=" mt-2">Nails</Typography>
    </Box>
  );
}

export default SubCategoriesCard;
