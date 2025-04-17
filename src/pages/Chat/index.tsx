import { IChatItem, IMessage, User } from "../../types";
import {
  Badge,
  ChatItemGroup,
  Input,
  MessageBoxGroup,
  Rater,
  SearchInput,
  Tooltip,
} from "../../components";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "motion/react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { BACKEND_BASE_URL } from "../../constant";
import countryList from "react-select-country-list";
import UploadGroup from "./UploadGroup";
import ChatInput from "./ChatInput";

const Chat = () => {
  const [search, setSearch] = useState<string>("");
  const [chatList, setChatList] = useState<IChatItem[]>([]);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [selectedChatItem, setSelectedChatItem] = useState<IChatItem | null>(
    null
  );
  const [selectedContacter, setSelectedContacter] = useState<User | null>(null);
  const [text, setText] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const countryConverter = countryList();

  const { user } = useSelector((state: RootState) => state.auth);

  const params = useParams();

  const handleChatListSelect = (chatItem: IChatItem) => {
    const contacter = user?.contacts.find(
      (contacter) => contacter._id === chatItem._id
    );
    if (!contacter) return;
    setSelectedContacter(contacter);
    setSelectedChatItem(chatItem);
  };

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUploadLoading(true);
    const file = event.target.files?.[0];
    if (file) {
      setFiles((prev) => [...prev, file]);
    }
    setUploadLoading(false);
  };

  const handleUploadDelete = (idx: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== idx));
  };

  useEffect(() => {
    if (user) {
      const chatList: IChatItem[] = user.contacts.map((contacter) => ({
        _id: contacter._id ?? "",
        avatar: contacter.avatar ?? "",
        alt: contacter.name ?? "",
        status: contacter.status ?? "offline",
        date: new Date(),
        title: contacter.name ?? "",
        subtitle: "What are you doing?",
        unread: 1,
      }));
      setChatList(chatList);
    }
    if (params.contacterId && user) {
      const contacter = user.contacts.find(
        (contacter) => contacter._id === params.contacterId
      );
      if (!contacter) return;
      const chatItem: IChatItem = {
        _id: contacter._id ?? "",
        avatar: contacter.avatar ?? "",
        alt: contacter.name ?? "",
        status: contacter.status ?? "offline",
        date: new Date(),
        title: contacter.name ?? "",
        subtitle: "What are you doing? Something else you are doing",
        unread: 1,
      };
      setSelectedChatItem(chatItem);
      setSelectedContacter(contacter);
    }
  }, [params, user]);

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
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring" }}
          className={`relative flex flex-col ${
            selectedContacter ? "w-1/2" : "w-3/4"
          } border border-white p-4 bg-white/20 backdrop-blur-md rounded-md pt-16 pb-4 px-4 shadow-lg transition-all duration-300 ease-in-out`}
        >
          {/* Messages Container */}
          <div className="mb-4 h-[600px]">
            <MessageBoxGroup messages={messages} />
          </div>
          {/* Fixed Input Container */}
          <div className="sticky bottom-0 bg-transparent pt-4">
            <div className="flex flex-row items-center gap-2 p-1">
              <ChatInput
                placeholder="Type your message here..."
                value={text}
                onChange={setText}
              />
              <Tooltip message="Send">
                <button
                  className={`p-2 rounded-lg shrink-0 transition-all duration-300 ease-in-out ${
                    selectedContacter
                      ? "bg-white cursor-pointer hover:bg-black/10 hover:backdrop-blur-sm hover:shadow-lg"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                  disabled={!selectedContacter}
                >
                  <Icon
                    icon="solar:plain-bold-duotone"
                    className="text-black w-5 h-5"
                  />
                </button>
              </Tooltip>
              <Tooltip message="Upload files">
                <button
                  className={`p-2 rounded-lg shrink-0 transition-all duration-300 ease-in-out ${
                    selectedContacter
                      ? "bg-white cursor-pointer hover:bg-black/10 hover:backdrop-blur-sm hover:shadow-lg"
                      : "bg-gray-300 cursor-not-allowed"
                  }`}
                  disabled={!selectedContacter}
                  onClick={handleUploadClick}
                >
                  <Icon
                    icon="solar:cloud-upload-bold-duotone"
                    className="text-black w-5 h-5"
                  />
                </button>
              </Tooltip>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
            {files.length > 0 && (
              <UploadGroup
                files={files}
                loading={uploadLoading}
                onDelete={handleUploadDelete}
              />
            )}
          </div>
        </motion.div>

        {/* Chatter profile */}
        {selectedContacter && (
          <motion.div
            initial={{ x: 100 }}
            animate={{ x: 0 }}
            transition={{ type: "spring" }}
            className="w-1/4 border border-white bg-white/20 backdrop-blur-md rounded-l-md rounded-r-xl shadow-lg flex flex-col items-center justify-center gap-2 p-8"
          >
            <img
              src={BACKEND_BASE_URL + selectedContacter?.avatar}
              alt={selectedContacter?.name ?? ""}
              className="w-[200px] h-[200px] xl:w-[180px] xl:h-[180px] object-cover object-center rounded-full shadow-lg bg-transparent"
            />
            <div className="mt-4">
              <div className="flex flex-row items-center gap-1">
                <h2 className="text-sm xl:text-xs font-semibold mr-2">
                  <strong>{selectedContacter?.name}</strong>
                </h2>
                <Badge type="kyc" />
                <Badge type="premium" />
              </div>
            </div>
            <div>
              <h3 className="text-sm xl:text-xs mr-2">
                <strong>@{selectedContacter?.shortname}</strong>
              </h3>
            </div>
            <div className="flex flex-row items-center gap-4">
              <span className="text-xs">
                {selectedContacter?.region?.includes(",")
                  ? selectedContacter.region
                  : `${selectedContacter?.region},`}{" "}
                <strong>
                  {countryConverter.getLabel(
                    selectedContacter?.country ?? "GB"
                  )}
                </strong>
              </span>
              <Icon
                icon={`flag:${selectedContacter?.country?.toLowerCase()}-4x3`}
                className="w-6 h-4 rounded-md"
              />
            </div>
            <div>
              <Rater rate={selectedContacter?.rate ?? 0} />
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
            <div className="w-full flex flex-col gap-2 mt-4">
              <h2 className="text-xs text-center border-b-[1px] border-gray-300 pb-1">
                <strong>{selectedContacter?.title}</strong>
              </h2>
              <p className="text-xs h-[120px] overflow-h_idden text-ellipsis whitespace-nowrap p-1 overflow-x-hidden overflow-y-auto">
                {selectedContacter?.about}
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Chat;
