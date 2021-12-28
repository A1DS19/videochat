import React from 'react';
import type { NextPage } from 'next';
import { ModalBody, FormControl, FormLabel, ModalFooter, Button } from '@chakra-ui/react';
import { Formik, FormikHelpers, Form, Field } from 'formik';
import { SignupType } from '../../../shared/auth';

interface SignupFormProps {
  onClose: () => void;
}

export const SignupForm: NextPage<SignupFormProps> = ({ onClose }): JSX.Element => {
  const initialValues: SignupType = {
    email: '',
    password: '',
  };

  return (
    <React.Fragment>
      <Formik
        initialValues={initialValues}
        onSubmit={(values: SignupType, {}: FormikHelpers<SignupType>) => {
          console.log('create', values);
        }}
      >
        <Form>
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel htmlFor='email'>Email Address</FormLabel>
              <Field className='input' id='email' type='email' name='email' />
            </FormControl>

            <FormControl mt={2}>
              <FormLabel htmlFor='password'>Password</FormLabel>
              <Field className='input' id='password' type='password' name='password' />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} type='submit'>
              Submit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </Form>
      </Formik>
    </React.Fragment>
  );
};
