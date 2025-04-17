import { ChatItem } from "react-chat-elements";
import { ChatItemType } from "../../../types";
import "./style.css";

const ChatItemGroup = ({
  chatList,
  selectedChatItem,
  onSelect,
}: {
  chatList: ChatItemType[];
  selectedChatItem: ChatItemType | null;
  onSelect: (chatItem: ChatItemType) => void;
}) => {
  return (
    <div className="w-full flex flex-col gap-2 overflow-x-hidden overflow-y-auto">
      {chatList.map((chatItem, index) => (
        <div
          className={`flex cursor-pointer transition-all duration-300 ease-in-out ${
            selectedChatItem &&
            selectedChatItem._id === chatItem._id &&
            "bg-white rounded-xl shadow-lg"
          }`}
        >
          <ChatItem
            key={index}
            id={index}
            avatar={chatItem.avatar}
            alt={chatItem.alt}
            title={chatItem.title}
            subtitle={chatItem.subtitle}
            date={chatItem.date}
            unread={chatItem.unread}
            onClick={() => onSelect(chatItem)}
            statusColor={chatItem.status === "online" ? "#18bf4b" : "gray"}
          />
        </div>
      ))}
    </div>
  );
};

export default ChatItemGroup;
