import React from 'react';
import type { NextPage } from 'next';
import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { MessageSchema } from '../../shared/validationSchemas/MessageValidationSchema';
import { UsersContext } from '../../../shared/context/users/UsersProvider';
import { RoomsContext } from '../../../shared/context/rooms/RoomsProvider';
import { Box, Button, FormControl, useDisclosure } from '@chakra-ui/react';
import { Message, send_message } from '../../../shared/context/rooms/chat';
import { useRouter } from 'next/router';
import { AuthModal } from './AuthModal';

interface ChatListProps {}

export const ChatForm: NextPage<ChatListProps> = ({}): JSX.Element => {
  const { currentUser } = React.useContext(UsersContext);
  const { currentRoom } = React.useContext(RoomsContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const initialValues: Message = {
    user_id: currentUser?.id!,
    room_id: currentRoom?.id!,
    message: '',
  };

  return (
    <React.Fragment>
      <Formik
        validationSchema={MessageSchema}
        initialValues={initialValues}
        onSubmit={(
          values: Message,
          { setSubmitting, resetForm }: FormikHelpers<Message>
        ) => {
          if (!currentUser) {
            setSubmitting(false);
            resetForm();
            onOpen();
            return;
          }

          send_message(values);
          setSubmitting(false);
          resetForm();
        }}
      >
        {({ isValid, dirty, isSubmitting, values }: FormikProps<Message>) => {
          return (
            <Form>
              <Box display={'flex'} width={'full'}>
                <FormControl>
                  <Field className='input' id='message' type='message' name='message' />
                  {/* <FormValidationError errors={errors} touched={touched} name='message' /> */}
                </FormControl>
                <Button
                  ml={1}
                  type='submit'
                  disabled={(!isValid && !dirty) || values.message.length < 0}
                  isLoading={isSubmitting}
                >
                  Send
                </Button>
              </Box>
            </Form>
          );
        }}
      </Formik>
      <AuthModal isOpen={isOpen} onClose={onClose} />
    </React.Fragment>
  );
};
