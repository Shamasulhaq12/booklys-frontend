/* eslint-disable no-unused-vars */

'use client';

import { Box, Stack, Typography } from '@mui/material';
import * as Yup from 'yup';
import React from 'react';
import { Form, Formik } from 'formik';
import { Check } from '@mui/icons-material';
import SubmitBtn from '@/app/common/components/SubmitBtn';
import FormikField from '@/shared/components/form/FormikField';
import useHandleApiResponse from '@/customHooks/useHandleApiResponse';
import { useAddContactMutation } from '@/services/private/users';

function ContactUsForm() {
  const [addContact, { error, isSuccess }] = useAddContactMutation();
  useHandleApiResponse(error, isSuccess, 'Information sent successfully!');

  const contactFormInitVals = {
    name: '',
    email: '',
    phone: '',
  };

  const contactFormValSchema = Yup.object({
    name: Yup.string().required('Required!'),
    email: Yup.string().trim().email('Invalid Email').required('Required'),
    phone: Yup.string().required('Required!'),
  });

  return (
    <Box className=" bg-skin flex justify-center items-center py-32 px-5">
      <Box className=" w-full flex flex-col justify-center items-center max-w-[1024px] ">
        <Typography
          variant="body3"
          className=" mb-2 py-1 px-4 rounded-3xl text-center text-white bg-green-900"
        >
          Try for Free
        </Typography>
        <Typography variant="h3" className=" normal-case my-2 font-semibold text-center w-[450px]">
          Vad våra användare säger om Booklyz
        </Typography>
        <Typography variant="body2" className=" my-8 text-center w-[450px]">
          Online booking system with everything you need to run a business on Sweden largest marketplace for
          beauty and health. Save time and focus on what you are passionate about.
        </Typography>

        <Box
          sx={{ boxShadow: '0 2px 15px #00000026' }}
          className=" p-10 border border-neutral-700 w-full max-w-[620px] bg-[#f0f6f9] rounded-[15px]"
        >
          <Formik
            enableReinitialize
            initialValues={contactFormInitVals}
            validationSchema={contactFormValSchema}
            onSubmit={async (values, { resetForm }) => {
              await addContact(values);
              resetForm({ values: contactFormInitVals });
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Box className=" flex gap-4">
                  <Stack gap={4}>
                    <FormikField
                      type="text"
                      label="Your name"
                      name="name"
                      placeholder="Type your name"
                      isStack
                    />

                    <FormikField
                      type="text"
                      label="Your email address"
                      name="email"
                      placeholder="Type your email"
                      isStack
                    />

                    <FormikField
                      type="text"
                      label="Your mobile number"
                      name="phone"
                      placeholder="Type your phone"
                      isStack
                    />
                  </Stack>
                  <Stack gap={4}>
                    <Box className=" flex items-center gap-2">
                      <Box className="border border-[#1a6337] rounded-full h-5 w-5 flex justify-center items-center">
                        <Check fontSize="small" style={{ color: '#1a6337', fontSize: '14px' }} />
                      </Box>
                      <Typography variant="body2" className=" font-medium">
                        Digital booking calendar.
                      </Typography>
                    </Box>
                    <Box className=" flex items-center gap-2">
                      <Box className="border border-[#1a6337] rounded-full h-5 w-5 flex justify-center items-center">
                        <Check fontSize="small" style={{ color: '#1a6337', fontSize: '14px' }} />
                      </Box>
                      <Typography variant="body2" className=" font-medium">
                        Digital booking calendar.
                      </Typography>
                    </Box>
                    <Box className=" flex items-center gap-2">
                      <Box className="border border-[#1a6337] rounded-full h-5 w-5 flex justify-center items-center">
                        <Check fontSize="small" style={{ color: '#1a6337', fontSize: '14px' }} />
                      </Box>
                      <Typography variant="body2" className=" font-medium">
                        Digital booking calendar.
                      </Typography>
                    </Box>
                    <Box className=" flex items-center gap-2">
                      <Box className="border border-[#1a6337] rounded-full h-5 w-5 flex justify-center items-center">
                        <Check fontSize="small" style={{ color: '#1a6337', fontSize: '14px' }} />
                      </Box>
                      <Typography variant="body2" className=" font-medium">
                        Digital booking calendar.
                      </Typography>
                    </Box>
                    <Box className=" flex items-center gap-2">
                      <Box className="border border-[#1a6337] rounded-full h-5 w-5 flex justify-center items-center">
                        <Check fontSize="small" style={{ color: '#1a6337', fontSize: '14px' }} />
                      </Box>
                      <Typography variant="body2" className=" font-medium">
                        Digital booking calendar.
                      </Typography>
                    </Box>
                  </Stack>
                </Box>

                <Box mt={3}>
                  <SubmitBtn label="Submit" isLoading={isSubmitting} className=" rounded-none" />
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
}

export default ContactUsForm;
