import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Empty, Spin } from "antd";
import ScrollArea from 'react-scrollbar';
import Message from './messages/Message';
import { MessageAction } from '../../../utils/state/actions';
import rootSocket from '../../../utils/socket';

const Messages: React.FC<any> = ({
  user,
  items,
  currentRoomId,
  isLoading,
  fetchMessages,
  addMessage,
  removeMessageById }) => {

  const onNewMessage = (data: any) => {
    console.log(data)
    addMessage(data);
  };

  useEffect((): any => {
    if (currentRoomId) {
      fetchMessages(currentRoomId);
    }

    rootSocket.on("NewMessage", onNewMessage);

    return () => {
      rootSocket.off("NewMessage", onNewMessage);
    };
  }, [currentRoomId]);

  return (
    <div className="messages">
      {
        isLoading ? (
          <div className="messages--loading">
            <Spin size="large" tip="Loading Messages..." />
          </div>
        ) : items.length > 0 && !isLoading ? (
          <ScrollArea
            speed={0.8}
            horizontal={false}
          >
            {items.map((item: any) => (
              <Message
                key={item._id}
                message={item}
                isMe={(user && user._id) === item.user._id}
                onRemoveMessage={removeMessageById}
              />
            ))}
          </ScrollArea>
        ) : (
              <Empty description="Messages is Empty" />
            )
      }
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  user: state.user.data,
  items: state.message.items,
  currentRoomId: state.rooms.currentRoom._id,
  isLoading: state.message.isLoading
});

export default connect(mapStateToProps, MessageAction)(Messages);
