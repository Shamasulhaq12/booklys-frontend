import * as Yup from 'yup';

export const slotFormInitVals = {
  date: '',
  time: '',
};

export const slotFormValSchema = Yup.object({
  date: Yup.date(),
  time: Yup.string(),
});
