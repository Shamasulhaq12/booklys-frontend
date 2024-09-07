/* eslint-disable no-unused-vars */
import React from 'react';
import { Form, Formik } from 'formik';
import { Box, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { useRouter } from 'next/navigation';
import { useGetServiceTimeSlotsQuery } from '@/services/private/services';
import SubmitBtn from '@/app/common/components/SubmitBtn';
import { slotFormInitVals, slotFormValSchema } from './data';
import FormikDatePicker from '@/shared/components/form/FormikDatePicker';
import FormikTimePicker from '@/shared/components/form/FormikTimePicker';
import FormikSelect from '@/shared/components/form/FormikSelect';

function ChooseTimeForm({ serviceId, companyId }) {
  const { data: timeSlotData } = useGetServiceTimeSlotsQuery();
  console.log('timeSlotData', timeSlotData);
  const router = useRouter();
  return (
    <Box>
      <Formik
        enableReinitialize
        initialValues={slotFormInitVals}
        validationSchema={slotFormValSchema}
        onSubmit={async values => {
          router.push(`/booking/checkout?service=${serviceId}&company=${companyId}&date=${values.date}&time=${values.time}`);
        }}
      >
        {({ isSubmitting, values, setFieldValue, resetForm }) => (
          <Form>
            <Stack gap={4}>
              <FormikDatePicker label="Booking Date" name="date" disablePast isRequired isStack />

              <FormikSelect name="time" label="Slot" options={[]} placeholder="Select" isRequired isStack />
            </Stack>
            <Box className="flex w-100 items-end justify-end gap-3" mt={3}>
              <SubmitBtn label="Next" isLoading={isSubmitting} className="rounded-3xl w-full" />
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
}

ChooseTimeForm.propTypes = {
  serviceId: PropTypes.number.isRequired,
  companyId: PropTypes.number.isRequired,
};

export default ChooseTimeForm;
