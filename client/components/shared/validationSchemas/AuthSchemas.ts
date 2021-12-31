import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please provide a valid email')
    .required('You must provide a email '),
  password: Yup.string()
    .min(10, 'The password must have at least 10 characters')
    .max(50, 'The password must have less than 50 characters')
    .required('You must provide a password'),
});

export const signupSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please provide a valid email')
    .required('You must provide a email '),
  password: Yup.string()
    .min(10, 'The password must have at least 10 characters')
    .max(50, 'The password must have less than 50 characters')
    .required('You must provide a password'),
});
