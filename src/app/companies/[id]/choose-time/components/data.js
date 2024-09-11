import * as Yup from 'yup';

export const slotFormInitVals = {
  time: '',
  staff: '',
};
export const slotFormValSchema = Yup.object({
  time: Yup.string(),
  staff: Yup.string(),
});
