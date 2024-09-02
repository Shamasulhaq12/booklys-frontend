import * as yup from 'yup';
import { yupLowercaseValidator } from '@/utilities/helpers';

export const staffContactsFormArrayInitVals = {
  calling_code: '',
  email: '',
  phone: '',
};

export const basicInfoFormInitVals = {
  first_name: '',
  last_name: '',
  nick_name: '',
  signature: '',
  social_security_number: '',
  staff_contacts: [staffContactsFormArrayInitVals],
};

export const basicInfoFormValSchema = yup.object({
  first_name: yup
    .string()
    .matches(/^[a-zA-Z ]*$/, 'Only Alphabets are allowed!')
    .required('Required'),
  last_name: yup
    .string()
    .matches(/^[a-zA-Z ]*$/, 'Only Alphabets are allowed!')
    .required('Required'),
  nick_name: yup
    .string()
    .matches(/^[a-zA-Z ]*$/, 'Only Alphabets are allowed!')
    .required('Required'),
  signature: yup.string().max(10, 'Cannot be more than 10 characters').required('Required'),
  social_security_number: yup.string().required('Required'),
  staff_contacts: yup.array().of(
    yup.object({
      email: yup
        .string()
        .email('Invalid Email')
        .test('lowercase', 'Should be lowercase!', yupLowercaseValidator)
        .required('Required'),
      phone: yup.string().required('Required'),
      calling_code: yup.string(),
    })
  ),
});

export const settingFormInitVals = {
  designation: '',
  is_student: false,
  price_group: '',
  work_from: '',
  is_onsite: false,
  company: '',
  online_booking_available: true,
  booking_interval_in_minutes: '',
};

export const settingFormValSchema = yup.object({
  designation: yup.string().required('Required'),
});

export const workScheduleFormArrayInitVals = {
  availability_days: [],
  start_time: '',
  end_time: '',
};

export const workScheduleFormInitVals = {
  staff_slots: [workScheduleFormArrayInitVals],
};
