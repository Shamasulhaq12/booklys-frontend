import PropTypes from 'prop-types';
import { Avatar, Box, Divider, Typography } from '@mui/material';
import moment from 'moment';
import React from 'react';
import { Info } from '@mui/icons-material';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useSnackbar } from 'notistack';
import { border } from '@/styles/common/colors';
import dummyImage from '@/assets/dummyImage.png';
import {
  useGetPublicCompanyByIdQuery,
  useGetPublicServiceByIdQuery,
} from '@/services/public/companyServices';
import { useUpdateBookingPaymentStatusMutation } from '@/services/private/paypal';
import SectionLoader from '@/app/common/loaders/SectionLoader';

function Checkout({ serviceId, date, time, companyId, bookingId }) {
  const { data: companyData } = useGetPublicCompanyByIdQuery(companyId);
  const { data: serviceData } = useGetPublicServiceByIdQuery(serviceId);

  const { enqueueSnackbar } = useSnackbar();

  const [{ isPending }] = usePayPalScriptReducer();

  const [sendPaymentStatus] = useUpdateBookingPaymentStatusMutation();

  const handleOnApprove = async (data, actions) => {
    try {
      await actions.order.capture();
      // CHECKING CHECKOUT TYPES

      const response = await sendPaymentStatus(bookingId);
      if (response?.error) {
        enqueueSnackbar(response?.error?.data?.error || 'Something Went Wrong', { variant: 'error' });
        return;
      }
      enqueueSnackbar(response?.data?.message || 'Payment Made', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar(error || 'Something Went Wrong', { variant: 'error' });
    }
  };

  const handleCreatePaypalOrder = async (data, actions) => {
    const createOrder = await actions.order.create({
      purchase_units: [
        {
          amount: {
            value: serviceData?.price,
            currency_code: 'USD',
          },
        },
      ],

      intent: 'CAPTURE',
    });

    return createOrder;
  };

  return isPending ? (
    <SectionLoader />
  ) : (
    <Box className=" p-8 w-full flex flex-col gap-8 rounded-3xl shadow-xl border border-gray-200">
      <Box className=" flex gap-2">
        <Avatar
          src={companyData?.company_images?.length > 0 ? companyData?.company_images[0].src : dummyImage.src}
          sx={{ borderRadius: '10px', width: '56px', height: '56px' }}
        />
        <Box>
          <Typography variant="body1" className=" font-semibold">
            {companyData?.name}
          </Typography>
          <Typography variant="body1" className=" text-grey font-semibold">
            {moment(date).format('DD MMM YYYY')}, {time}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: border }} />

      <Box className=" flex gap-2">
        <Info fontSize="small" className=" border rounded-full text-themeBorder" />
        <Typography variant="body1" className=" text-grey font-semibold">
          This service can be canceled free of charge.
        </Typography>
      </Box>

      <Divider sx={{ borderColor: border }} />

      <Box className=" flex gap-2 justify-between">
        <Box>
          <Typography variant="body1" className=" text-grey font-semibold">
            {serviceData?.service_name}
          </Typography>
          <Typography variant="body2" className=" text-grey font-semibold mt-1">
            {serviceData?.service_timing} min
          </Typography>
        </Box>
        <Typography variant="body1" className="font-semibold">
          {serviceData?.price} kr
        </Typography>
      </Box>

      <Divider sx={{ borderColor: border }} />

      <Box className=" flex flex-col gap-2">
        <Box className=" flex gap-2 justify-between">
          <Typography variant="body1" className=" text-grey font-semibold">
            Price
          </Typography>
          <Typography variant="body1" className="font-medium">
            {serviceData?.price} kr
          </Typography>
        </Box>
        <Box className=" flex gap-2 justify-between">
          <Typography variant="body1" className=" text-grey font-semibold">
            Pay Today
          </Typography>
          <Typography variant="body1" className="font-medium">
            {serviceData?.price} kr
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: border }} />

      <PayPalButtons
        fundingSource="paypal"
        style={{ height: 55 }}
        onCancel={() => {}}
        onError={() => {}}
        // createSubscription={handleCreateSubscription}
        createOrder={handleCreatePaypalOrder}
        onApprove={handleOnApprove}
      />
    </Box>
  );
}

Checkout.propTypes = {
  serviceId: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  companyId: PropTypes.number.isRequired,
  bookingId: PropTypes.number.isRequired,
};

export default Checkout;
