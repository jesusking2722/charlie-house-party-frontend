import { MessageBox } from "react-chat-elements";
import "./style.css";
import { Message } from "../../../types";

const MessageBoxGroup = ({ messages }: { messages: Message[] }) => {
  return (
    <div className="flex-1 overflow-y-auto flex flex-col h-full">
      <div className="flex flex-col gap-4 p-2">
        {messages.map((message) => (
          <div
            className={`${
              message.position === "left" ? "message-left" : "message-right"
            }`}
          >
            <MessageBox
              {...message}
              titleColor="#09cbf9"
              replyButton
              removeButton
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageBoxGroup;
