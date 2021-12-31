import React from 'react';
import type { NextPage } from 'next';
import { ModalBody, FormControl, FormLabel, ModalFooter, Button } from '@chakra-ui/react';
import { Formik, FormikHelpers, Form, Field, FormikProps } from 'formik';
import { signup, SignupType } from '../../../shared/requests/auth';
import { FormValidationError } from '../../shared/FormValidationError';
import { signupSchema } from '../../shared/validationSchemas/AuthSchemas';
import { useMutation } from 'react-query';
import { CostumAlert } from '../../shared/CostumAlert';
import { me } from '../../../shared/context/users/users';
import { UsersContext } from '../../../shared/context/users/UsersProvider';

interface SignupFormProps {
  onClose: () => void;
}

export const SignupForm: NextPage<SignupFormProps> = ({ onClose }): JSX.Element => {
  const { addUser } = React.useContext(UsersContext);
  const [resError, setResError] = React.useState<string | null>(null);
  const { mutate } = useMutation(signup, {
    onError: (err: any) => {
      setResError(err.response.data.message);
    },
    onSuccess: async () => {
      const data = await me();
      addUser(data);
      onClose();
    },
  });

  const initialValues: SignupType = {
    email: '',
    password: '',
  };

  return (
    <React.Fragment>
      <Formik
        initialValues={initialValues}
        validationSchema={signupSchema}
        onSubmit={async (values: SignupType, {}: FormikHelpers<SignupType>) => {
          await mutate(values);
        }}
      >
        {({ errors, touched }: FormikProps<SignupType>) => (
          <Form>
            {resError && <CostumAlert type='error' msg={resError} />}
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
