import { min } from 'lodash';
import * as yup from 'yup';
export const profileValidationSchema = yup.object().shape({
  name: yup
    .string()
    .min(5, 'Name must be atleast 5 characters long.')
    .max(100, 'Name must be less than 100 characters.')
    .required('form:error-name-required'),
  profile: yup.object().shape({
    avatar: yup.string(),
    bio: yup
      .string()
      .min(2, 'Bio must be atleast 2 characters long.')
      .max(1000, 'Bio must be less than 1000 characters.'),
    contact: yup
      .string()
      .min(10, 'Contact must be atleast 10 characters long.')
      .max(15, 'Contact must be less than 15 characters.'),
  }),
});
