import { MessageBox } from "react-chat-elements";
import "./style.css";
import { IMessage } from "../../../types";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { BACKEND_BASE_URL } from "../../../constant";

const MessageBoxGroup = ({ messages }: { messages: IMessage[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prevMessageCount = useRef(messages.length);

  useEffect(() => {
    if (!containerRef.current) return;

    // Only auto-scroll if:
    // 1. New message was added (array length increased)
    // 2. User isn't currently scrolling (optional)
    const shouldScroll = messages.length > prevMessageCount.current;
    prevMessageCount.current = messages.length;

    if (shouldScroll) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  return (
    <div
      ref={containerRef}
      className="overflow-y-auto flex flex-col h-full"
      style={{ scrollBehavior: "smooth" }}
    >
      <div className="flex flex-col gap-4 p-2">
        {messages
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          )
          .map((message) => (
            <div
              key={message._id}
              className={`${
                message.position === "left" ? "message-left" : "message-right"
              }`}
            >
              {/* Message rendering logic remains unchanged */}
              {message.type === "text" ? (
                <motion.div
                  initial={
                    message.position === "left"
                      ? { x: -50, opacity: 0 }
                      : { x: 50, opacity: 0 }
                  }
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ type: "spring" }}
                >
                  <MessageBox
                    {...message}
                    id={message._id}
                    notch={true}
                    type="text"
                    titleColor="#09cbf9"
                    replyButton={false}
                    removeButton={false}
                  />
                </motion.div>
              ) : message.type === "photo" ? (
                <motion.div
                  initial={
                    message.position === "left"
                      ? { x: -50, opacity: 0 }
                      : { x: 50, opacity: 0 }
                  }
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ type: "spring" }}
                >
                  <MessageBox
                    {...message}
                    id={message._id}
                    notch={true}
                    type="photo"
                    data={{
                      uri: BACKEND_BASE_URL + `${message.photo ?? ""}`,
                      width: 400,
                      height: 400,
                      status: {
                        autoDownload: false,
                        download: false,
                      },
                    }}
                    titleColor="#09cbf9"
                    replyButton={false}
                    removeButton={false}
                  />
                </motion.div>
              ) : message.type === "file" ? (
                <motion.div
                  initial={
                    message.position === "left"
                      ? { x: -50, opacity: 0 }
                      : { x: 50, opacity: 0 }
                  }
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ type: "spring" }}
                >
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
                    replyButton={false}
                    removeButton={false}
                  />
                </motion.div>
              ) : message.type === "video" ? (
                <motion.div
                  initial={
                    message.position === "left"
                      ? { x: -50, opacity: 0 }
                      : { x: 50, opacity: 0 }
                  }
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ type: "spring" }}
                >
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
                    replyButton={false}
                    removeButton={false}
                  />
                </motion.div>
              ) : message.type === "audio" ? (
                <motion.div
                  initial={
                    message.position === "left"
                      ? { x: -50, opacity: 0 }
                      : { x: 50, opacity: 0 }
                  }
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ type: "spring" }}
                >
                  <MessageBox
                    {...message}
                    id={message._id}
                    notch={true}
                    type="audio"
                    data={{
                      audioURL: message.audio ?? "",
                    }}
                    titleColor="#09cbf9"
                    replyButton={false}
                    removeButton={false}
                  />
                </motion.div>
              ) : null}
            </div>
          ))}
      </div>
    </div>
  );
};

export default MessageBoxGroup;
