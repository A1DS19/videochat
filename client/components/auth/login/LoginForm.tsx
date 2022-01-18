import React from 'react';
import type { NextPage } from 'next';
import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { signin, SigninType } from '../../../shared/requests/auth';
import { Box, Button, FormControl, Text } from '@chakra-ui/react';
import { loginSchema } from '../../shared/validationSchemas/AuthSchemas';
import { FormValidationError } from '../../shared/FormValidationError';
import { useMutation } from 'react-query';
import { CostumAlert } from '../../shared/CostumAlert';
import { me } from '../../../shared/context/users/users';
import { UsersContext } from '../../../shared/context/users/UsersProvider';
import { whichAuth } from '../../../pages/auth';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface LoginFormProps {
  setAuthType: React.Dispatch<React.SetStateAction<whichAuth>>;
}

export const LoginForm: NextPage<LoginFormProps> = ({ setAuthType }): JSX.Element => {
  const router = useRouter();
  const { addUser } = React.useContext(UsersContext);
  const [resError, setResError] = React.useState<string | null>(null);
  const { mutate } = useMutation(signin, {
    onError: (err: any) => {
      setResError(err.response.data.message);
    },
    onSuccess: async () => {
      const data = await me();
      addUser(data);
      router.push('/');
    },
  });

  const initialValues: SigninType = {
    email: '',
    password: '',
    userName: '',
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
        {({
          errors,
          touched,
          isValid,
          dirty,
          values,
          isSubmitting,
        }: FormikProps<SigninType>) => (
          <Form>
            {resError && <CostumAlert type='error' msg={resError} />}
            <Box>
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
                  placeholder='Password'
                  className='input'
                  id='password'
                  type='password'
                  name='password'
                />
                <FormValidationError errors={errors} touched={touched} name='password' />
              </FormControl>
            </Box>

            <Box mt={2}>
              <Text className='link' onClick={() => setAuthType('signup')}>
                Don't have an account?
              </Text>
              <Link href={'/room/test_1'}>
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
