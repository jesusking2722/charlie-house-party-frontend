import { ChatItem } from "react-chat-elements";
import { IChatItem } from "../../../types";
import "./style.css";
import { BACKEND_BASE_URL } from "../../../constant";

const ChatItemGroup = ({
  chatList,
  selectedChatItem,
  onSelect,
}: {
  chatList: IChatItem[];
  selectedChatItem: IChatItem | null;
  onSelect: (chatItem: IChatItem) => void;
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
            {...chatItem}
            key={index}
            id={chatItem._id}
            avatar={BACKEND_BASE_URL + chatItem.avatar}
            onClick={() => onSelect(chatItem)}
            statusColor={chatItem.status === "online" ? "#18bf4b" : "gray"}
          />
        </div>
      ))}
    </div>
  );
};

export default ChatItemGroup;
