import * as yup from 'yup';
export const categoryValidationSchema = yup.object().shape({
  name: yup
    .string()
    .min(5, 'Name must be atleast 5 characters long.')
    .max(100, 'Name must be less than 100 characters.')
    .required('form:error-name-required'),
  type: yup.object().required('form:error-type-required'),
});
