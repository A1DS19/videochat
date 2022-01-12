import React from 'react';
import type { NextPage } from 'next';
import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { MessageSchema } from '../../shared/validationSchemas/MessageValidationSchema';
import { UsersContext } from '../../../shared/context/users/UsersProvider';
import { RoomsContext } from '../../../shared/context/rooms/RoomsProvider';
import { Box, Button, FormControl, useDisclosure } from '@chakra-ui/react';
import { LoginModal } from '../../auth/login/LoginModal';
import { Message, send_message } from '../../../shared/context/rooms/chat';
import { Message as MessageComp } from './Message';

interface ChatListProps {}

export const ChatList: NextPage<ChatListProps> = ({}): JSX.Element => {
  const { currentUser } = React.useContext(UsersContext);
  const { currentRoom, currentRoomChat } = React.useContext(RoomsContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialValues: Message = {
    user_id: currentUser?.id!,
    room_id: currentRoom?.id!,
    message: '',
  };

  const renderChat = () => {
    return currentRoomChat.map((message) => (
      <MessageComp message={message} currentUserUID={currentUser?.id!} />
    ));
  };

  console.log(currentRoomChat);

  return (
    <React.Fragment>
      {currentRoomChat && renderChat()}
      <Formik
        validationSchema={MessageSchema}
        initialValues={initialValues}
        onSubmit={(
          values: Message,
          { setSubmitting, resetForm }: FormikHelpers<Message>
        ) => {
          if (!currentUser) {
            onOpen();
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

      <LoginModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </React.Fragment>
  );
};
