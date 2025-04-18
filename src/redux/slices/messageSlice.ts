import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Message } from "../../types";

interface MessageState {
  messages: Message[];
}

const initialMessageState: MessageState = {
  messages: [],
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
    addNewMessage(
      state: MessageState,
      action: PayloadAction<{ newMessage: Message }>
    ) {
      state.messages.push(action.payload.newMessage);
    },
  },
});

export const { setMessage, addNewMessage } = messageSlice.actions;
export default messageSlice.reducer;
