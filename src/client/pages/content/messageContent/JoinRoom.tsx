import React, { useState } from 'react';
import { connect } from "react-redux";
import { Button, Input } from 'antd';
import { RoomAction } from '../../../utils/state/actions';

const JoinRoom: React.FC<any> = ({ fetchAddUserToRoom, currentRoomType, currentRoomName, currentRoomId, userId }) => {
  const [password, setPassword] = useState("");

  const passwordHandler = (event: any) => {
    setPassword(event.target.value);
  };

  return (
    <div className="message-content__join-room">
      <p>{currentRoomName}</p>
      {
        (currentRoomType === 'private')
          ? <Input placeholder="Write Room Password" onChange={passwordHandler} />
          : null
      }
      <Button type="primary" onClick={() => fetchAddUserToRoom({ currentRoomId: currentRoomId, userId: userId, password: password })}>Join Room</Button>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  userId: state.user.data._id,
  currentRoomId: state.rooms.currentRoom._id,
  currentRoomName: state.rooms.currentRoom.name,
  currentRoomType: state.rooms.currentRoom.type
});

export default connect(mapStateToProps, RoomAction)(JoinRoom);
