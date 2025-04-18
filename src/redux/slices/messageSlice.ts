import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message } from "../../types";

interface MessageState {
  messages: Message[];
  currentSenderId: string | null;
  currentMessageId: string | null;
}

const initialMessageState: MessageState = {
  messages: [],
  currentSenderId: null,
  currentMessageId: null,
};

const messageSlice = createSlice({
  name: "message",
  initialState: initialMessageState,
  reducers: {
    setMessage(
      state: MessageState,
      action: PayloadAction<{ messages: Message[] }>
    ) {
      state.messages = action.payload.messages;
    },
    setCurrentSenderId(
      state: MessageState,
      action: PayloadAction<{ senderId: string }>
    ) {
      state.currentSenderId = action.payload.senderId;
    },
    setCurrentMessageId(
      state: MessageState,
      action: PayloadAction<{ messageId: string }>
    ) {
      state.currentMessageId = action.payload.messageId;
    },
    addNewMessage(
      state: MessageState,
      action: PayloadAction<{ newMessage: Message }>
    ) {
      state.messages.push(action.payload.newMessage);
    },
    updateMessageToRead(
      state: MessageState,
      action: PayloadAction<{ updatedMessages: Message[] }>
    ) {
      const { updatedMessages } = action.payload;
      state.messages.forEach((message) => {
        const existing = updatedMessages.find(
          (updatedMessage) => updatedMessage._id === message._id
        );
        if (existing) {
          message.status = "read";
        }
      });
    },
    updateMessage(
      state: MessageState,
      action: PayloadAction<{ updatedMessage: Message }>
    ) {
      const { updatedMessage } = action.payload;
      state.messages.forEach((message, index) => {
        if (message._id === updatedMessage._id) {
          state.messages[index] = updatedMessage;
        }
      });
    },
  },
});

export const {
  setMessage,
  setCurrentSenderId,
  setCurrentMessageId,
  addNewMessage,
  updateMessageToRead,
  updateMessage,
} = messageSlice.actions;
export default messageSlice.reducer;
