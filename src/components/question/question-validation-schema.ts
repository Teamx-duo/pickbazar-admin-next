import * as yup from 'yup';
export const questionValidationSchema = yup.object().shape({
  answer: yup
    .string()
    .min(2, 'Answer must be atleast 2 characters long.')
    .max(500, 'Answer must be less than 500 characters.')
    .required('form:error-answer-required'),
});
