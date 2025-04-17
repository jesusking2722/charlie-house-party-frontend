import { ChatItemType, IMessage } from "../../types";
import {
  Badge,
  ChatItemGroup,
  Input,
  MessageBoxGroup,
  Rater,
  SearchInput,
} from "../../components";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "motion/react";

const initialChatList: ChatItemType[] = [
  {
    _id: "1",
    avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
    alt: "kursat_avatar",
    title: "Kursat",
    subtitle: "Why don't we go to the No Way Home movie this weekend ?",
    date: new Date(),
    unread: 3,
    status: "online",
  },
  {
    _id: "2",
    avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
    alt: "kursat_avatar",
    title: "Kursat",
    subtitle: "Why don't we go to the No Way Home movie this weekend ?",
    date: new Date(),
    unread: 3,
    status: "offline",
  },
  {
    _id: "3",
    avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
    alt: "kursat_avatar",
    title: "Kursat",
    subtitle: "Why don't we go to the No Way Home movie this weekend ?",
    date: new Date(),
    unread: 3,
    status: "online",
  },
  {
    _id: "4",
    avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
    alt: "kursat_avatar",
    title: "Kursat",
    subtitle: "Why don't we go to the No Way Home movie this weekend ?",
    date: new Date(),
    unread: 3,
    status: "offline",
  },
  {
    _id: "5",
    avatar: "https://avatars.githubusercontent.com/u/80540635?v=4",
    alt: "kursat_avatar",
    title: "Kursat",
    subtitle: "Why don't we go to the No Way Home movie this weekend ?",
    date: new Date(),
    unread: 3,
    status: "online",
  },
];

const initialMessages: IMessage[] = [
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
  const [messages, setMessages] = useState<IMessage[]>(initialMessages);
  const [selectedChatItem, setSelectedChatItem] = useState<ChatItemType | null>(
    null
  );

  const [text, setText] = useState<string>();

  const handleChatListSelect = (chatItem: ChatItemType) => {
    setSelectedChatItem(chatItem);
  };

  return (
    <div className="w-[80%] mx-auto py-8 flex flex-col gap-14">
      <div className="w-full flex gap-8 h-[700px]">
        {/* Chat list */}
        <motion.div
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ type: "spring" }}
          className="w-1/4 flex flex-col gap-4 border border-white rounded-tl-xl rounded-bl-xl rounded-tr-md rounded-br-md p-4 bg-white/20 backdrop-blur-sm shadow-lg"
        >
          <div className="w-full flex flex-row items-center gap-2 border-b-[1px] border-white p-2">
            <SearchInput value={search} onChange={setSearch} />
          </div>
          <div className="w-full">
            <ChatItemGroup
              chatList={chatList}
              selectedChatItem={selectedChatItem}
              onSelect={handleChatListSelect}
            />
          </div>
        </motion.div>

        {/* Chat content */}
        <motion.div
          initial={{ y: 200 }}
          animate={{ y: 0 }}
          transition={{ type: "spring" }}
          className="relative flex flex-col w-1/2 border border-white p-4 bg-white/20 backdrop-blur-md rounded-md pt-16 pb-4 px-4 shadow-lg"
        >
          {/* Messages Container */}
          <div className="mb-4 h-[500px]">
            <MessageBoxGroup messages={messages} />
          </div>
          {/* Fixed Input Container */}
          <div className="sticky bottom-0 bg-transparent pt-4">
            <div className="flex flex-row items-center gap-2 p-1">
              <Input
                type="text"
                placeholder="Type your message here...."
                value={text}
                onChange={setText}
              />
              <button className="p-2 bg-white rounded-lg shrink-0 transition-all duration-300 ease-in-out hover:bg-black/10 hover:backdrop-blur-sm hover:shadow-lg">
                <Icon
                  icon="solar:plain-bold-duotone"
                  className="text-black w-5 h-5"
                />
              </button>
              <button className="p-2 bg-white rounded-lg shrink-0 transition-all duration-300 ease-in-out hover:bg-black/10 hover:backdrop-blur-sm hover:shadow-lg">
                <Icon
                  icon="solar:cloud-upload-bold-duotone"
                  className="text-black w-5 h-5"
                />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Chatter profile */}
        <motion.div
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ type: "spring" }}
          className="w-1/4 border border-white bg-white/20 backdrop-blur-md rounded-l-md rounded-r-xl shadow-lg flex flex-col items-center gap-2 p-16"
        >
          <img
            src="https://avatars.githubusercontent.com/u/80540635?v=4"
            alt="user"
            className="w-[200px] h-[200px] object-cover object-center rounded-full shadow-lg bg-transparent"
          />
          <div className="mt-4 flex flex-row items-center gap-4">
            <h2 className="text-lg font-semibold">
              <strong>Kursat</strong>.{" "}
              <strong className="text-sm">@kursat</strong>
            </h2>
            <div className="flex flex-row items-center gap-1">
              <Badge type="kyc" />
              <Badge type="premium" />
            </div>
          </div>
          <div className="flex flex-row items-center gap-4">
            <span className="text-sm">
              Torontto, <strong>Canada</strong>
            </span>
            <Icon icon="flag:ca-4x3" className="w-6 h-4 rounded-md" />
          </div>
          <div>
            <Rater rate={4.3} />
          </div>
          <div className="flex flex-row items-center gap-2 w-full justify-center">
            <Icon
              icon="solar:check-circle-bold"
              className="text-green-500 w-5 h-5"
            />
            <span className="text-xs">
              Total completed parties: <strong>5</strong>
            </span>
          </div>
          <div className="w-full flex-1 flex flex-col gap-2 mt-4">
            <h2 className="text-xs text-center border-b-[1px] border-gray-300 pb-1">
              <strong>Party Lover & Owner</strong>
            </h2>
            <p className="text-xs flex-1 overflow-hidden text-ellipsis whitespace-nowrap p-1 overflow-x-hidden overflow-y-auto">
              I love to open my party
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Chat;
