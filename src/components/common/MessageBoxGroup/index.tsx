import { MessageBox } from "react-chat-elements";
import "./style.css";
import { IMessage } from "../../../types";

const MessageBoxGroup = ({ messages }: { messages: IMessage[] }) => {
  return (
    <div className="flex-1 overflow-y-auto flex flex-col h-full">
      <div className="flex flex-col gap-4 p-2">
        {messages.map((message) => (
          <div
            className={`${
              message.position === "left" ? "message-left" : "message-right"
            }`}
          >
            {message.type === "text" ? (
              <MessageBox
                {...message}
                id={message._id}
                type="text"
                titleColor="#09cbf9"
                replyButton
                removeButton
              />
            ) : message.type === "photo" ? (
              <MessageBox
                {...message}
                id={message._id}
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
