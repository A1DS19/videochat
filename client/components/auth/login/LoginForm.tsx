import React from 'react';
import type { NextPage } from 'next';
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  FormikHandlers,
  FormikHelpers,
  FormikProps,
} from 'formik';
import { SigninType } from '../../../shared/auth';
import { Button, FormControl, FormLabel, ModalBody, ModalFooter } from '@chakra-ui/react';
import { loginSchema } from '../../shared/validationSchemas/AuthSchemas';
import { FormValidationError } from '../../shared/FormValidationError';

interface LoginFormProps {
  onClose: () => void;
}

export const LoginForm: NextPage<LoginFormProps> = ({ onClose }): JSX.Element => {
  const initialValues: SigninType = {
    email: '',
    password: '',
  };

  return (
    <React.Fragment>
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={(values: SigninType, {}: FormikHelpers<SigninType>) => {
          console.log('login', values);
        }}
      >
        {({ errors, touched }: FormikProps<SigninType>) => (
          <Form>
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel htmlFor='email'>Email Address</FormLabel>
                <Field className='input' id='email' type='email' name='email' />

                <FormValidationError errors={errors} touched={touched} name='email' />
              </FormControl>

              <FormControl mt={2}>
                <FormLabel htmlFor='password'>Password</FormLabel>
                <Field className='input' id='password' type='password' name='password' />
                <FormValidationError errors={errors} touched={touched} name='password' />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='blue' mr={3} type='submit'>
                Submit
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};
