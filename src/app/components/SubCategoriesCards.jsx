/* eslint-disable no-unused-vars */

'use client';

import { Box } from '@mui/material';
import React from 'react';
import SubCategoriesCard from './SubCategoriesCard';
import { useGetCategoriesQuery } from '@/services/private/categories';

function SubCategoriesCards() {
  const { data = [], isLoading, isFetching } = useGetCategoriesQuery();

  return (
    <Box className="-mx-1 flex flex-wrap gap-y-2 sm:-mx-2 lg:-mx-4">
      {data?.map(item => (
        <SubCategoriesCard key={item?.id} title={item?.name} id={item?.id} />
      ))}
    </Box>
  );
}

export default SubCategoriesCards;
