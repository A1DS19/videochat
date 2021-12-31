import React from 'react';
import type { NextPage } from 'next';
import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { signin, SigninType } from '../../../shared/requests/auth';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import { loginSchema } from '../../shared/validationSchemas/AuthSchemas';
import { FormValidationError } from '../../shared/FormValidationError';
import { useMutation } from 'react-query';
import { CostumAlert } from '../../shared/CostumAlert';
import { me } from '../../../shared/context/users/users';
import { UsersContext } from '../../../shared/context/users/UsersProvider';

interface LoginFormProps {
  onClose: () => void;
}

export const LoginForm: NextPage<LoginFormProps> = ({ onClose }): JSX.Element => {
  const { addUser } = React.useContext(UsersContext);
  const [resError, setResError] = React.useState<string | null>(null);
  const { mutate } = useMutation(signin, {
    onError: (err: any) => {
      setResError(err.response.data.message);
    },
    onSuccess: async () => {
      const data = await me();
      addUser(data);
      onClose();
    },
  });

  const initialValues: SigninType = {
    email: '',
    password: '',
  };

  return (
    <React.Fragment>
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={async (values: SigninType, {}: FormikHelpers<SigninType>) => {
          await mutate(values);
        }}
      >
        {({ errors, touched }: FormikProps<SigninType>) => (
          <Form>
            <ModalBody pb={6}>
              {resError && <CostumAlert type='error' msg={resError} />}
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
