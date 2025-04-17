import { ChatItem, ChatList } from "react-chat-elements";
import { ChatItemType } from "../../types";
import { ChatItemGroup, IconButton, SearchInput } from "../../components";
import { useState } from "react";

const initialChatList: ChatItemType[] = [
  {
    avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
    alt: "kursat_avatar",
    title: "Kursat",
    subtitle: "Why don't we go to the No Way Home movie this weekend ?",
    date: new Date(),
    unread: 3,
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
    alt: "kursat_avatar",
    title: "Kursat",
    subtitle: "Why don't we go to the No Way Home movie this weekend ?",
    date: new Date(),
    unread: 3,
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
    alt: "kursat_avatar",
    title: "Kursat",
    subtitle: "Why don't we go to the No Way Home movie this weekend ?",
    date: new Date(),
    unread: 3,
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
    alt: "kursat_avatar",
    title: "Kursat",
    subtitle: "Why don't we go to the No Way Home movie this weekend ?",
    date: new Date(),
    unread: 3,
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
    alt: "kursat_avatar",
    title: "Kursat",
    subtitle: "Why don't we go to the No Way Home movie this weekend ?",
    date: new Date(),
    unread: 3,
  },
];

const Chat = () => {
  const [search, setSearch] = useState<string>("");
  const [chatList, setChatList] = useState<ChatItemType[]>(initialChatList);

  return (
    <div className="w-[80%] mx-auto py-8 flex flex-col gap-14">
      <div className="w-full flex flex-row gap-8">
        <div className="w-1/4 min-h-screen flex flex-col gap-4 border border-white rounded-tl-xl rounded-bl-xl p-4">
          <div className="w-full flex flex-row items-center gap-2 border-b-[1px] border-white pb-1">
            <IconButton icon="solar:double-alt-arrow-left-bold-duotone" />
            <SearchInput value={search} onChange={setSearch} />
          </div>
          <div className="w-full">
            <ChatItemGroup chatList={chatList} />
          </div>
        </div>
        <div className="w-1/2"></div>
        <div className="w-1/4"></div>
      </div>
    </div>
  );
};

export default Chat;
