import * as yup from 'yup';
export const shopValidationSchema = yup.object().shape({
  name: yup
    .string()
    .min(5, 'Name must be atleast 5 characters long.')
    .max(100, 'Name must be less than 100 characters.')
    .required('form:error-name-required'),
  description: yup
    .string()
    .min(10, 'Description must be atleast 10 characters long.')
    .max(2000, 'Description must be less than 2000 characters.')
    .required('form:error-name-description'),
  balance: yup.object().shape({
    payment_info: yup.object().shape({
      email: yup
        .string()
        .typeError('form: error-email-string')
        .email('form:error-email-format')
        .required('form:error-email-required'),
      account: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .required('form:error-email-required'),
      bank: yup.string().required('form:error-bank-required'),
      name: yup
        .string()
        .min(5, 'Name must be atleast 5 characters long.')
        .max(100, 'Name must be less than 100 characters.')
        .typeError('Name must be between 5 to 100 characters.')
        .required('form:error-name-required'),
    }),
  }),
  settings: yup.object().shape({
    contact: yup
      .string()
      .min(10, 'Contact must be atleast 10 characters long.')
      .max(15, 'Contact must be less than 15 characters.')
      .required('form:error-email-required'),
    website: yup.string(),
  }),
});
