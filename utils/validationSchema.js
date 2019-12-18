import * as Yup from 'yup';

export const email = Yup.string()
  .email('Please, enter valid email.')
  .max(100, 'Please, enter valid email.')
  .required('Please, enter valid email.');
export const password = Yup.string()
  .min(6, 'Password must contain 6-20 characters.')
  .max(20, 'Password must contain 6-20 characters.')
  .required('Passwords don’t match.');
export const passwordLogin = Yup.string()
  .min(6, 'Wrong password')
  .max(20, 'Wrong password')
  .required('Wrong password');

export const shape = (args) => Yup.object().shape(args);
