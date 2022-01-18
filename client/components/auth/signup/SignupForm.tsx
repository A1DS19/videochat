import React from 'react';
import type { NextPage } from 'next';
import { FormControl, Button, Box, Text } from '@chakra-ui/react';
import { Formik, FormikHelpers, Form, Field, FormikProps } from 'formik';
import { signup, SignupType } from '../../../shared/requests/auth';
import { FormValidationError } from '../../shared/FormValidationError';
import { signupSchema } from '../../shared/validationSchemas/AuthSchemas';
import { useMutation } from 'react-query';
import { CostumAlert } from '../../shared/CostumAlert';
import { me } from '../../../shared/context/users/users';
import { UsersContext } from '../../../shared/context/users/UsersProvider';
import { whichAuth } from '../../../pages/auth';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface SignupFormProps {
  setAuthType: React.Dispatch<React.SetStateAction<whichAuth>>;
}

export const SignupForm: NextPage<SignupFormProps> = ({ setAuthType }): JSX.Element => {
  const router = useRouter();
  const { addUser } = React.useContext(UsersContext);
  const [resError, setResError] = React.useState<string | null>(null);
  const { mutate } = useMutation(signup, {
    onError: (err: any) => {
      setResError(err.response.data.message);
    },
    onSuccess: async () => {
      const data = await me();
      addUser(data);
      router.push('/');
    },
  });

  const initialValues: SignupType = {
    email: '',
    password: '',
    userName: '',
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
        {({
          errors,
          touched,
          isValid,
          dirty,
          values,
          isSubmitting,
        }: FormikProps<SignupType>) => (
          <Form autoComplete='off'>
            {resError && <CostumAlert type='error' msg={resError} />}
            <FormControl>
              <Field
                placeholder='Email'
                className='input'
                id='email'
                type='email'
                name='email'
              />
              <FormValidationError errors={errors} touched={touched} name='email' />
            </FormControl>

            <FormControl mt={2}>
              <Field
                placeholder='Username'
                className='input'
                id='userName'
                name='userName'
              />
              <FormValidationError errors={errors} touched={touched} name='userName' />
            </FormControl>

            <FormControl mt={2}>
              <Field
                placeholder='Password'
                className='input'
                id='password'
                type='password'
                name='password'
              />
              <FormValidationError errors={errors} touched={touched} name='password' />
            </FormControl>

            <Box mt={2}>
              <Text className='link' onClick={() => setAuthType('login')}>
                Already have an account?
              </Text>
              <Link href={`/room/test_1`}>
                <a target={'_blank'} className='link'>
                  Want to test a group call?
                </a>
              </Link>
            </Box>

            <Box my={3}>
              <Button
                disabled={
                  (!isValid && !dirty) ||
                  values.email.length < 0 ||
                  values.password.length < 0
                }
                isLoading={isSubmitting}
                colorScheme='blue'
                type='submit'
              >
                Submit
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};
