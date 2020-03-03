import { gql } from 'apollo-boost';

export const GET_CHAT = gql`
  query GetChat($chatId: Int!) {
    GetChat(chatId: $chatId) {
      ok
      error
      chat {
        passengerId
        driverId
        messages {
          id
          text
          userId
        }
      }
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation SendMessage($text: String!, $chatId: Int!) {
    SendChatMessage(text: $text, chatId: $chatId) {
      ok
      error
      message {
        id
        text
        userId
      }
    }
  }
`;

export const SUBSCRIBE_TO_MESSAGES = gql`
  subscription MessageSubscription {
    MessageSubscription {
      id
      text
      userId
    }
  }
`;
