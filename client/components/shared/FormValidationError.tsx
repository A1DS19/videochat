import React from 'react';
import type { NextPage } from 'next';
import { Alert, AlertIcon, AlertDescription } from '@chakra-ui/react';
import { FormikErrors, FormikTouched } from 'formik';

interface FormValidationErrorProps {
  errors: FormikErrors<any>;
  touched: FormikTouched<any>;
  name: string;
}

export const FormValidationError: NextPage<FormValidationErrorProps> = ({
  errors,
  touched,
  name,
}): JSX.Element => {
  return (
    <React.Fragment>
      {errors[name] && touched[name] ? (
        <Alert status='error' rounded={'lg'} my={2}>
          <AlertIcon />
          <AlertDescription>{errors[name]}</AlertDescription>
        </Alert>
      ) : null}
    </React.Fragment>
  );
};
