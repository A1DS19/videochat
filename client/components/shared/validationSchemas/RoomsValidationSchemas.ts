import * as Yup from 'yup';

export const CreateRoomValidationSchema = Yup.object().shape({
  roomName: Yup.string().required('The name of the room cannot be empty'),
});
