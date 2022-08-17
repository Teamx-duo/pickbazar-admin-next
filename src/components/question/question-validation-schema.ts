import * as yup from 'yup';
export const questionValidationSchema = yup.object().shape({
  answer: yup.string().required('form:error-answer-required'),
});
