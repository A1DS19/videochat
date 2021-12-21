import React from 'react';

const RoomPage = (): JSX.Element => {
  const [inCall, setInCall] = React.useState<boolean>(false);

  return <React.Fragment>{inCall ? 'IN' : 'OUT'}</React.Fragment>;
};

export default RoomPage;
