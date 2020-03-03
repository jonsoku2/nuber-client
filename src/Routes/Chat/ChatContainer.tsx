import { useMutation, useQuery } from '@apollo/react-hooks';
import { SubscribeToMoreOptions } from 'apollo-boost';
import React, { useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import ChatPresenter from './ChatPresenter';
import { GET_CHAT, SEND_MESSAGE, SUBSCRIBE_TO_MESSAGES } from './ChatQueries';
import { USER_PROFILE } from '../../sharedQueries';
import {
  GetChat,
  GetChatVariables,
  SendMessage,
  SendMessageVariables,
  UserProfile
  } from '../../types/api';

interface IProps extends RouteComponentProps<any> {}

const ChatContainer: React.FC<IProps> = ({ match, history }) => {
  if (!match.params.chatId) {
    history.push("/");
  }

  const [message, setMessage] = useState("");

  const { data: userData } = useQuery<UserProfile>(USER_PROFILE);
  const { data, loading, subscribeToMore } = useQuery<
    GetChat,
    GetChatVariables
  >(GET_CHAT, {
    variables: {
      chatId: Number(match.params.chatId)
    },
    onCompleted({ GetChat }) {
      if (!GetChat) {
        return;
      }
      if (GetChat.ok) {
        const subscribeToMoreOption: SubscribeToMoreOptions = {
          document: SUBSCRIBE_TO_MESSAGES,
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) {
              return prev;
            }
            const {
              data: { MessageSubscription }
            } = subscriptionData;

            const {
              GetChat: {
                chat: { messages }
              }
            } = prev;

            const newMessageId = MessageSubscription.id;
            const latestMessageId = messages[messages.length - 1].id;

            if (newMessageId === latestMessageId) {
              return;
            }

            const newObj = Object.assign({}, prev, {
              GetChat: {
                ...prev.GetChat,
                chat: {
                  ...prev.GetChat.chat,
                  messages: [
                    subscriptionData.data.MessageSubscription,
                    ...prev.GetChat.chat.messages
                  ]
                }
              }
            });
            return newObj;
          }
        };
        subscribeToMore(subscribeToMoreOption);
      }
    }
  });
  const [sendMessageFn] = useMutation<SendMessage, SendMessageVariables>(
    SEND_MESSAGE
  );

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { value }
    } = event;
    setMessage(value);
  };
  const onSubmit = () => {
    const {
      params: { chatId }
    } = match;
    if (message !== "") {
      setMessage("");
      sendMessageFn({
        variables: {
          chatId: Number(chatId),
          text: message
        }
      });
    }
    return;
  };

  return (
    <ChatPresenter
      userData={userData}
      data={data}
      loading={loading}
      messageText={message}
      onInputChange={onInputChange}
      onSubmit={onSubmit}
    />
  );
};

export default ChatContainer;
