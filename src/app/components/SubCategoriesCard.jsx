/* eslint-disable no-unused-vars */
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import PropTypes from 'prop-types';
import React from 'react';
import Link from 'next/link';
import categoryImage from '@/assets/category-img.webp';
import { dark, secondary } from '@/styles/common/colors';

function SubCategoriesCard({ title = '', image = '', id = '' }) {
  return (
    <Box className=" h-full w-full p-1 sm:p-2 lg:p-4 basis-full sm:basis-1/2 md:basis-1/3 cursor-pointer">
      <Link href={`/search?category=${id}`}>
        <Box className="group relative">
          <Image src={image || categoryImage} alt="Category Img" width={348} height={200} className="rounded-md min-h-[200px] max-h-[200px]" />
          <Box
            sx={{ backgroundColor: dark }}
            className=" absolute left-0 top-0 z-10 hidden h-full w-full flex-col justify-start gap-2 rounded-md bg-opacity-90 p-4 text-white group-hover:flex"
          >
            <Typography
              variant="body1"
              fontWeight={600}
              className="flex-shrink overflow-hidden overflow-ellipsis text-sm text-white"
            >
              Book a thai massage, foot massage or lymph massage. You can also make an appointment with a
              physical therapist.
            </Typography>
            <Typography
              variant="body1"
              fontWeight={600}
              color={secondary}
              className=" flex-shrink-0 flex-grow-0"
            >
              Book treatment here!
            </Typography>
          </Box>
        </Box>
        <Typography variant="body1" fontWeight={500} className=" mt-2">
          {title}
        </Typography>
      </Link>
    </Box>
  );
}

SubCategoriesCard.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
  id: PropTypes.number,
};

export default SubCategoriesCard;
