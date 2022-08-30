import * as yup from 'yup';
export const orderStatusValidationSchema = yup.object().shape({
  name: yup
    .string()
    .min(5, 'Name must be atleast 5 characters long.')
    .max(50, 'Name must be less than 50 characters.')
    .required('form:error-name-required'),
  serial: yup
    .number()
    .typeError('form:error-specify-number')
    .positive('form:error-serial-must-positive')
    .integer('form:error-serial-must-integer')
    .required('form:error-serial-required'),
  color: yup.string().required('form:error-color-required'),
});
