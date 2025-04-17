import { ChatItemType, Message } from "../../types";
import {
  ChatItemGroup,
  Input,
  MessageBoxGroup,
  SearchInput,
} from "../../components";
import { useState } from "react";
import { Icon } from "@iconify/react";

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

const initialMessages: Message[] = [
  {
    id: "1",
    position: "left",
    title: "Charlie",
    type: "text",
    text: "Hi there!",
    date: new Date(),
    status: "read",
    focus: false,
    forwarded: false,
    notch: true,
    retracted: false,
  },
  {
    id: "1",
    position: "right",
    title: "Charlie",
    type: "text",
    text: "Hi there!",
    date: new Date(),
    status: "read",
    focus: false,
    forwarded: false,
    notch: true,
    retracted: false,
  },
  {
    id: "1",
    position: "left",
    title: "Charlie",
    type: "text",
    text: "Hi there!",
    date: new Date(),
    status: "read",
    focus: false,
    forwarded: false,
    notch: true,
    retracted: false,
  },
  {
    id: "1",
    position: "right",
    title: "Charlie",
    type: "text",
    text: "Hi there!",
    date: new Date(),
    status: "read",
    focus: false,
    forwarded: false,
    notch: true,
    retracted: false,
  },
  {
    id: "1",
    position: "left",
    title: "Charlie",
    type: "text",
    text: "Hi there!",
    date: new Date(),
    status: "read",
    focus: false,
    forwarded: false,
    notch: true,
    retracted: false,
  },
  {
    id: "1",
    position: "right",
    title: "Charlie",
    type: "text",
    text: "Hi there!",
    date: new Date(),
    status: "read",
    focus: false,
    forwarded: false,
    notch: true,
    retracted: false,
  },
  {
    id: "1",
    position: "left",
    title: "Charlie",
    type: "text",
    text: "Hi there!",
    date: new Date(),
    status: "read",
    focus: false,
    forwarded: false,
    notch: true,
    retracted: false,
  },
  {
    id: "1",
    position: "right",
    title: "Charlie",
    type: "text",
    text: "Hi there!",
    date: new Date(),
    status: "read",
    focus: false,
    forwarded: false,
    notch: true,
    retracted: false,
  },
  {
    id: "1",
    position: "left",
    title: "Charlie",
    type: "text",
    text: "Hi there!",
    date: new Date(),
    status: "read",
    focus: false,
    forwarded: false,
    notch: true,
    retracted: false,
  },
  {
    id: "1",
    position: "right",
    title: "Charlie",
    type: "text",
    text: "Hi there!",
    date: new Date(),
    status: "read",
    focus: false,
    forwarded: false,
    notch: true,
    retracted: false,
  },
  {
    id: "1",
    position: "left",
    title: "Charlie",
    type: "text",
    text: "Hi there!",
    date: new Date(),
    status: "read",
    focus: false,
    forwarded: false,
    notch: true,
    retracted: false,
  },
  {
    id: "1",
    position: "right",
    title: "Charlie",
    type: "text",
    text: "Hi there!",
    date: new Date(),
    status: "read",
    focus: false,
    forwarded: false,
    notch: true,
    retracted: false,
  },
  {
    id: "1",
    position: "left",
    title: "Charlie",
    type: "text",
    text: "Hi there!",
    date: new Date(),
    status: "read",
    focus: false,
    forwarded: false,
    notch: true,
    retracted: false,
  },
  {
    id: "1",
    position: "right",
    title: "Charlie",
    type: "text",
    text: "Hi there!",
    date: new Date(),
    status: "read",
    focus: false,
    forwarded: false,
    notch: true,
    retracted: false,
  },
  {
    id: "1",
    position: "left",
    title: "Charlie",
    type: "text",
    text: "Hi there!",
    date: new Date(),
    status: "read",
    focus: false,
    forwarded: false,
    notch: true,
    retracted: false,
  },
  {
    id: "1",
    position: "right",
    title: "Charlie",
    type: "text",
    text: "Hi there!",
    date: new Date(),
    status: "read",
    focus: false,
    forwarded: false,
    notch: true,
    retracted: false,
  },
  {
    id: "1",
    position: "left",
    title: "Charlie",
    type: "text",
    text: "Hi there!",
    date: new Date(),
    status: "read",
    focus: false,
    forwarded: false,
    notch: true,
    retracted: false,
  },
  {
    id: "1",
    position: "right",
    title: "Charlie",
    type: "text",
    text: "Hi there!",
    date: new Date(),
    status: "read",
    focus: false,
    forwarded: false,
    notch: true,
    retracted: false,
  },
  {
    id: "1",
    position: "left",
    title: "Charlie",
    type: "text",
    text: "Hi there!",
    date: new Date(),
    status: "read",
    focus: false,
    forwarded: false,
    notch: true,
    retracted: false,
  },
];

const Chat = () => {
  const [search, setSearch] = useState<string>("");
  const [chatList, setChatList] = useState<ChatItemType[]>(initialChatList);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [text, setText] = useState<string>();

  return (
    <div className="w-[80%] mx-auto py-8 flex flex-col gap-14">
      <div className="w-full flex gap-8 h-[700px]">
        <div className="w-1/4 flex flex-col gap-4 border border-white rounded-tl-xl rounded-bl-xl rounded-tr-md rounded-br-md p-4 bg-white/20 backdrop-blur-sm shadow-lg">
          <div className="w-full flex flex-row items-center gap-2 border-b-[1px] border-white p-2">
            <SearchInput value={search} onChange={setSearch} />
          </div>
          <div className="w-full">
            <ChatItemGroup chatList={chatList} />
          </div>
        </div>
        <div className="relative flex flex-col w-1/2 border border-white p-4 bg-white/20 backdrop-blur-md rounded-md pt-16 pb-4 px-4 shadow-lg">
          {/* Messages Container */}
          <div className="mb-4 h-[500px]">
            <MessageBoxGroup messages={messages} />
          </div>
          {/* Fixed Input Container */}
          <div className="sticky bottom-0 bg-transparent pt-4">
            <div className="flex flex-row items-center gap-2 p-1">
              <Input
                type="text"
                placeholder="Describe about your party here..."
                value={text}
                onChange={setText}
              />
              <button className="p-2 bg-white rounded-lg shrink-0">
                <Icon
                  icon="solar:plain-bold-duotone"
                  className="text-black w-5 h-5"
                />
              </button>
            </div>
          </div>
        </div>

        <div className="w-1/4 border border-white p-4 bg-white/20 backdrop-blur-md rounded-l-md rounded-r-xl shadow-lg"></div>
      </div>
    </div>
  );
};

export default Chat;
