import { ChatItem } from "react-chat-elements";
import { ChatItemType } from "../../../types";
import "./style.css";

const ChatItemGroup = ({ chatList }: { chatList: ChatItemType[] }) => {
  return (
    <div className="w-full flex flex-col gap-2">
      {chatList.map((chatList, index) => (
        <ChatItem
          id={index}
          avatar={chatList.avatar}
          alt={chatList.alt}
          title={chatList.title}
          subtitle={chatList.subtitle}
          date={chatList.date}
          unread={chatList.unread}
        />
      ))}
    </div>
  );
};

export default ChatItemGroup;
