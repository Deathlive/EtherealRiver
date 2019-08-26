import React from "react";
import { Empty, Spin } from "antd";
import ScrollArea from 'react-scrollbar';
import Message from './messages/Message';

const isLoading = false;

const items: any[] = [
  {
    id: 1,
    userId: 5,
    author: 'NickName',
    avatar: 'Link',
    contet: 'Super Content',
    likes: 5,
    dislikes: 1,
    emotions: [],
    reaction: 'liked',
    createdAt: '',
    updatedAt: '',
  },
  {
    id: 2,
    userId: 3,
    author: 'Super NickName',
    avatar: 'Link',
    contet: 'Super Content',
    likes: 11,
    dislikes: 2346,
    emotions: [],
    reaction: '',
    createdAt: Date.now(),
    updatedAt: '',
  }
];

const Messages: React.FC<any> = ({ user }) => {
  return (
    <ScrollArea
      speed={0.8}
      horizontal={false}
    >
      <div className="messages">
        {isLoading ? (
          <Spin size="large" tip="Loading Messages..." />
        ) : items && !isLoading ? (
          items.length > 0 ? (
            items.map((item: any) => (
              <Message
                key={item.id}
                {...item}
                isMe={(user && user.id) === item.userId}
              />
            ))
          ) : (
              <Empty description="Messages is Empty" />
            )
        ) : (
              <Empty description="Open Rooms" />
            )}
      </div>
    </ScrollArea >
  );
};

export default Messages;
