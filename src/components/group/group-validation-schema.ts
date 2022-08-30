import * as yup from 'yup';
export const typeValidationSchema = yup.object().shape({
  name: yup
    .string()
    .min(5, 'Name must be atleast 5 characters long.')
    .max(100, 'Name must be less than 200 characters.')
    .required('form:error-name-required'),
  banners: yup
    .array()
    .min(1, 'form:error-min-one-banner')
    .of(
      yup.object().shape({
        title: yup.string().required('form:error-title-required'),
      })
    ),
});
