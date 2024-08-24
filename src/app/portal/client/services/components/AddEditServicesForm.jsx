/* eslint-disable no-unused-vars */

'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import { Article, KeyboardArrowDown, Person, Remove, Settings } from '@mui/icons-material';
import FormikField from '@/shared/components/form/FormikField';
import FormikSelect from '@/shared/components/form/FormikSelect';
import SubmitBtn from '@/app/common/components/SubmitBtn';
import { servicesFormInitVals, servicesFormValSchema } from '../utilities/formUtils';
import {
  useAddServiceMutation,
  useGetServiceByIdQuery,
  useGetServiceQuery,
  useUpdateServiceMutation,
} from '@/services/private/services';
import useHandleApiResponse from '@/customHooks/useHandleApiResponse';
import { border } from '@/styles/common/colors';
import FormikTimePicker from '@/shared/components/form/FormikTimePicker';
import FormikDropZone from '@/shared/components/form/FormikDropZone';
import { priceTypeOptions } from '../utilities/data';
import { useGetCompanyQuery } from '@/services/private/company';
import { useGetUserQuery } from '@/services/private/users';
import BookingFieldArray from './BookingFieldArray';

function AddEditServicesForm({ serviceSlug }) {
  const [initValues, setInitValues] = useState(servicesFormInitVals);

  // API HOOKS
  const { data: serviceData } = useGetServiceByIdQuery(serviceSlug, {
    skip: !serviceSlug,
  });

  const { data: companyData } = useGetCompanyQuery();

  const { data: basicServiceData } = useGetServiceQuery({ service_type: 'basic' });

  const { data: userData } = useGetUserQuery();
  // const { data: categoriesData } = useGetCategoriesQuery();
  const [addService, { error, isSuccess }] = useAddServiceMutation();
  const [updateService, { error: editError, isSuccess: isEditSuccess }] = useUpdateServiceMutation();
  useHandleApiResponse(error, isSuccess, 'Service added successfully!', true);
  useHandleApiResponse(editError, isEditSuccess, 'Service updated successfully!', true);

  //   TRANSFORMERS
  const companyOptions = useMemo(() => {
    if (companyData) {
      return companyData?.map(item => ({
        label: item.name,
        value: item.id,
      }));
    }

    return [];
  }, [companyData]);

  const basicServiceOptions = useMemo(() => {
    if (basicServiceData) {
      return basicServiceData?.map(item => ({
        label: item.service_name,
        value: item.id,
      }));
    }

    return [];
  }, [basicServiceData]);

  const userOptions = useMemo(() => {
    if (userData) {
      return userData?.map(item => ({
        label: item.username,
        value: item.id,
      }));
    }

    return [];
  }, [companyData]);

  useEffect(() => {
    if (serviceData?.service_slug) {
      setInitValues({
        service_name: serviceData?.service_name || '',
        service_sku: serviceData?.service_sku || '',
        service_description: serviceData?.service_description || '',
        basic_service: serviceData?.basic_service || '',
        price_type: serviceData?.price_type || '',
        price: serviceData?.price || '',
        category: serviceData?.category || '',
        service_timing: serviceData?.service_timing || '',
        service_provider: serviceData?.service_provider || '',
        company: serviceData?.company || '',
        service_booking_fields: serviceData?.service_booking_fields || [],
      });
    }
  }, [serviceData]);

  return (
    <Box sx={{ borderRadius: '10px' }} className="bg-white p-8">
      <Formik
        enableReinitialize
        initialValues={initValues}
        validationSchema={servicesFormValSchema}
        onSubmit={async values => {
          if (serviceData?.service_slug) {
            await updateService({ ...values, slug: serviceData?.service_slug });
          } else {
            const payload = {
              ...values,
              service_price: [
                {
                  price: values?.price,
                  price_type: values?.price_type,
                },
              ],
            };
            await addService(payload);
          }
        }}
      >
        {({ isSubmitting, values, resetForm }) => (
          <Form className=" w-1/3">
            <Accordion defaultExpanded className=" mt-8 p-8 rounded-2xl border border-slate-900">
              <AccordionSummary
                expandIcon={<KeyboardArrowDown />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Stack direction="row" justifyContent="center" alignItems="center" gap={3}>
                  <Settings />
                  <Box>
                    <Typography variant="h6" fontWeight={500}>
                      Basic Information
                    </Typography>
                    <Typography variant="subHead">Name, Price, time, and Category</Typography>
                  </Box>
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                <Stack direction="column" gap="24px">
                  <FormikField
                    name="service_name"
                    label="Service Title"
                    isRequired
                    type="text"
                    placeholder="Service Title"
                    isStack
                  />

                  <Divider sx={{ borderColor: border }} className="my-3" />

                  <FormikField
                    name="service_sku"
                    label="Service SKU"
                    isRequired
                    type="text"
                    placeholder="Service SKU"
                    isStack
                  />

                  <Divider sx={{ borderColor: border }} className="my-3" />

                  <FormikField
                    label="Description"
                    placeholder="Enter description..."
                    name="service_description"
                    type="textarea"
                    rows={16}
                    isRequired
                    isStack
                  />

                  <Divider sx={{ borderColor: border }} className="my-3" />

                  <FormikSelect
                    name="category"
                    label="Category"
                    options={[]}
                    placeholder="Select"
                    isRequired
                    isStack
                    isPortal
                  />

                  <Divider sx={{ borderColor: border }} className="my-3" />

                  <FormikSelect
                    name="basic_service"
                    label="Basic Service"
                    options={basicServiceOptions}
                    placeholder="Select"
                    isRequired
                    isStack
                    isPortal
                  />

                  <Divider sx={{ borderColor: border }} className="my-3" />

                  <FormikSelect
                    name="price_type"
                    label="Price Type"
                    options={priceTypeOptions}
                    placeholder="Select"
                    isRequired
                    isStack
                    isPortal
                  />

                  <Divider sx={{ borderColor: border }} className="my-3" />

                  <FormikField
                    name="price"
                    label="Price"
                    type="number"
                    placeholder="Price"
                    isRequired
                    isStack
                  />

                  <Divider sx={{ borderColor: border }} className="my-3" />

                  <FormikTimePicker label="Service Timing" name="service_timing" isRequired isStack />

                  <Divider sx={{ borderColor: border }} className="my-3" />

                  <FormikSelect
                    name="service_provider"
                    label="Service Provider"
                    options={userOptions}
                    placeholder="Select"
                    isRequired
                    isStack
                    isPortal
                  />

                  <Divider sx={{ borderColor: border }} className="my-3" />

                  <FormikSelect
                    name="company"
                    label="Company"
                    options={companyOptions}
                    placeholder="Select"
                    isRequired
                    isStack
                    isPortal
                  />
                </Stack>
              </AccordionDetails>
            </Accordion>

            <Accordion className=" mt-8 p-8 rounded-2xl border border-slate-900">
              <AccordionSummary
                expandIcon={<KeyboardArrowDown />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Stack direction="row" justifyContent="center" alignItems="center" gap={3}>
                  <Person />
                  <Box>
                    <Typography variant="h6" fontWeight={500}>
                      User
                    </Typography>
                    <Typography variant="subHead">Who performs the service</Typography>
                  </Box>
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                <Stack direction="column" gap="24px">
                  <Divider sx={{ borderColor: border }} className="my-3" />

                  <FormikSelect
                    name="service_provider"
                    label="Service Provider"
                    options={userOptions}
                    placeholder="Select"
                    isRequired
                    isStack
                    isPortal
                  />
                </Stack>
              </AccordionDetails>
            </Accordion>

            <Accordion className=" mt-8 p-8 rounded-2xl border border-slate-900">
              <AccordionSummary
                expandIcon={<KeyboardArrowDown />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Stack direction="row" justifyContent="center" alignItems="center" gap={3}>
                  <Article />
                  <Box>
                    <Typography variant="h6" fontWeight={500}>
                      Booking field
                    </Typography>
                    <Typography variant="subHead">What must be filled in when booking</Typography>
                  </Box>
                </Stack>
              </AccordionSummary>
              <AccordionDetails>
                <Stack direction="column" gap="24px">
                  <Divider sx={{ borderColor: border }} className="my-3" />

                  <BookingFieldArray name="service_booking_fields" />
                </Stack>
              </AccordionDetails>
            </Accordion>

            <Box className="flex w-100 align-items-center justify-center" mt={3}>
              <SubmitBtn label="Activate Service" isLoading={isSubmitting} className="rounded-3xl" />
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

AddEditServicesForm.propTypes = {
  serviceSlug: PropTypes.number,
};

export default AddEditServicesForm;
