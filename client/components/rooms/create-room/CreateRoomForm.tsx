import React from 'react';
import type { NextPage } from 'next';
import { RoomsContext } from '../../../shared/context/rooms/RoomsProvider';
import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik';
import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Text,
  useToast,
} from '@chakra-ui/react';
import { CostumAlert } from '../../shared/CostumAlert';
import { FormValidationError } from '../../shared/FormValidationError';
import { CreateRoomValidationSchema } from '../../shared/validationSchemas/RoomsValidationSchemas';
import { useMutation } from 'react-query';
import { createRoom } from '../../../shared/context/rooms/rooms';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Room } from '../../../shared/context/rooms/types';
import Link from 'next/link';

interface CreateRoomFormProps {}

type CreateRoom = {
  roomName: string;
};

export const CreateRoomForm: NextPage<CreateRoomFormProps> = ({}): JSX.Element => {
  const toast = useToast();
  const { addRoom } = React.useContext(RoomsContext);
  const [resError, setResError] = React.useState<string | null>(null);
  const [newRoom, setNewRoom] = React.useState<Room | null>(null);
  const [link, setLink] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState<boolean>(false);
  const { mutate, isLoading, isError, error } = useMutation(createRoom, {
    onSuccess: (room) => {
      setResError(null);
      addRoom(room);
      setNewRoom(room);
      setLink(
        process.env.NODE_ENV === 'development'
          ? `http://localhost:3000/room/${room.url_name}`
          : `https://videochat-five.vercel.app/room/${room.url_name}`
      );
    },
    onError: (err: any) => {
      setResError(err.response.data.message);
    },
  });

  const initialValues: CreateRoom = {
    roomName: '',
  };

  React.useEffect(() => {
    if (copied) {
      toast({
        status: 'info',
        duration: 3000,
        isClosable: true,
        title: 'Link copied',
      });

      setCopied(false);
    }
  }, [copied]);

  return (
    <React.Fragment>
      <Formik
        initialValues={initialValues}
        validationSchema={CreateRoomValidationSchema}
        onSubmit={async (
          values: CreateRoom,
          { setSubmitting, resetForm }: FormikHelpers<CreateRoom>
        ) => {
          setSubmitting(true);
          await mutate(values.roomName);
          resetForm();
          setSubmitting(false);
        }}
      >
        {({
          errors,
          touched,
          isValid,
          dirty,
          values,
          isSubmitting,
          resetForm,
        }: FormikProps<CreateRoom>) => (
          <Form>
            <Box pb={6} mt={3}>
              {resError && <CostumAlert type='error' msg={resError} />}
              {link && (
                <React.Fragment>
                  <Flex mb={3}>
                    <Heading fontWeight={'normal'} margin={'auto 0'} fontSize={'md'}>
                      Room {newRoom?.name} created
                    </Heading>
                    <CopyToClipboard text={link} onCopy={() => setCopied(true)}>
                      <Button mx={1} size={'sm'}>
                        Copy link
                      </Button>
                    </CopyToClipboard>
                  </Flex>

                  <Text>
                    Go to room{' '}
                    <Link href={link}>
                      <a className='link'>{link}</a>
                    </Link>
                  </Text>
                </React.Fragment>
              )}
              {!newRoom && (
                <FormControl>
                  <Field
                    placeholder='Room name'
                    className='input'
                    id='roomName'
                    name='roomName'
                  />

                  <FormValidationError
                    errors={errors}
                    touched={touched}
                    name='roomName'
                  />
                </FormControl>
              )}
            </Box>

            <Box>
              {!newRoom && (
                <Button
                  disabled={(!isValid && !dirty) || values.roomName.length < 0}
                  isLoading={isSubmitting}
                  colorScheme='blue'
                  mr={3}
                  type='submit'
                >
                  Submit
                </Button>
              )}
              {!newRoom && (
                <Button
                  onClick={() => {
                    resetForm();
                    setResError(null);
                  }}
                >
                  Cancel
                </Button>
              )}

              {newRoom && (
                <Button
                  onClick={() => {
                    setNewRoom(null);
                    setLink(null);
                  }}
                >
                  Create another room
                </Button>
              )}
            </Box>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};
