import { ShippingType } from '@ts-types/generated';
import * as yup from 'yup';
export const shippingValidationSchema = yup.object().shape({
  name: yup
    .string()
    .min(5, 'Name must be atleast 5 characters long.')
    .max(100, 'Name must be less than 100 characters.')
    .required('form:error-name-required'),
  type: yup.string().required('form:error-type-required'),
  amount: yup.mixed().when('type', {
    is: (value: string) => value !== ShippingType.Free,
    then: yup
      .number()
      .typeError('form:error-amount-must-number')
      .positive('form:error-amount-must-positive')
      .required('form:error-amount-required'),
  }),
});
