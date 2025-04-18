import { MessageBox } from "react-chat-elements";
import "./style.css";
import { IMessage } from "../../../types";
import { useRef } from "react";

const MessageBoxGroup = ({ messages }: { messages: IMessage[] }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  return (
    <div className="overflow-y-auto flex flex-col h-full">
      <div className="flex flex-col-reverse gap-4 p-2">
        {" "}
        {/* Reverse container */}
        {/* Anchor for auto-scrolling */}
        <div ref={messagesEndRef} />
        {messages.map((message) => (
          <div
            key={message._id}
            className={`${
              message.position === "left" ? "message-left" : "message-right"
            }`}
          >
            {message.type === "text" ? (
              <MessageBox
                {...message}
                id={message._id}
                notch={true}
                type="text"
                titleColor="#09cbf9"
                replyButton
                removeButton
              />
            ) : message.type === "photo" ? (
              <MessageBox
                {...message}
                id={message._id}
                notch={true}
                type="photo"
                data={{
                  uri: message.photo ?? "",
                  status: {
                    autoDownload: true,
                  },
                }}
                titleColor="#09cbf9"
                replyButton
                removeButton
              />
            ) : message.type === "file" ? (
              <MessageBox
                {...message}
                id={message._id}
                notch={true}
                type="file"
                data={{
                  uri: message.file ?? "",
                  status: {
                    autoDownload: true,
                  },
                }}
                titleColor="#09cbf9"
                replyButton
                removeButton
              />
            ) : message.type === "video" ? (
              <MessageBox
                {...message}
                id={message._id}
                notch={true}
                type="video"
                controlsList=""
                data={{
                  videoURL: message.video ?? "",
                  thumbnailURL: "",
                  status: {
                    click: false,
                    loading: 0,
                  },
                }}
                titleColor="#09cbf9"
                replyButton
                removeButton
              />
            ) : message.type === "audio" ? (
              <MessageBox
                {...message}
                id={message._id}
                notch={true}
                type="audio"
                data={{
                  audioURL: message.audio ?? "",
                }}
                titleColor="#09cbf9"
                replyButton
                removeButton
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageBoxGroup;
