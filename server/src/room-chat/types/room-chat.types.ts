export type MessagePayload = {
  room_id: number;
  user_id: number;
  message: string;
};

export type Callback = () => void;
