import { IChatItem, IMessage, Message, User } from "../../types";
import {
  Badge,
  ChatItemGroup,
  Input,
  Loader,
  MessageBoxGroup,
  Rater,
  SearchInput,
  Spinner,
  Tooltip,
  TypingLoader,
} from "../../components";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { motion } from "motion/react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState, store } from "../../redux/store";
import { BACKEND_BASE_URL, MAX_FILE_SIZE_MB } from "../../constant";
import countryList from "react-select-country-list";
import UploadGroup from "./UploadGroup";
import ChatInput from "./ChatInput";
import socket from "../../lib/socketInstance";
import {
  convertMultipleIChatItems,
  convertMultipleMessagesToIMessages,
} from "../../utils";
import { debounce } from "lodash";
import toast from "react-hot-toast";

const Chat = () => {
  const [search, setSearch] = useState<string>("");
  const [chatList, setChatList] = useState<IChatItem[]>([]);
  const [selectedMessages, setSelectedMessages] = useState<IMessage[]>([]);
  const [selectedChatItem, setSelectedChatItem] = useState<IChatItem | null>(
    null
  );
  const [selectedContacter, setSelectedContacter] = useState<User | null>(null);
  const [text, setText] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedMessageLoading, setSelectedMessageLoading] =
    useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [showTypingLoader, setShowTypingLoader] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const countryConverter = countryList();

  const { user } = useSelector((state: RootState) => state.auth);
  const { messages, currentSenderId, currentMessageId, typingUser } =
    useSelector((state: RootState) => state.message);

  const params = useParams();

  const handleChatListSelect = async (chatItem: IChatItem) => {
    debugger;
    setSelectedMessageLoading(true);
    const contacter = user?.contacts.find(
      (contacter) => contacter._id === chatItem._id
    );
    if (!contacter || !user) return;
    const contacterMessages = messages.filter(
      (message) =>
        (message.sender._id === user._id &&
          message.receiver._id === contacter._id) ||
        (message.sender._id === contacter._id &&
          message.receiver._id === user._id)
    );

    // update messages to read if there are unread messages on selected chat.
    const updatingMessages = contacterMessages.filter(
      (message) => message.status !== "read"
    );
    if (updatingMessages.length > 0) {
      // wait for message's read in redux store.
      const waitForUpdateMessage = new Promise<Message>((resolve) => {
        const unsubscribe = store.subscribe(() => {
          const state = store.getState();
          const updatedMessage = state.message.messages.find(
            (message) =>
              message._id === updatingMessages[0]._id &&
              message.status === "read"
          );
          if (
            updatedMessage &&
            updatedMessage._id &&
            updatedMessage.status === "read"
          ) {
            unsubscribe();
            resolve(updatedMessage);
          }
        });
      });

      socket.emit("message:multiple-update-read", updatingMessages);
      await waitForUpdateMessage;
      const contacterMessages = messages.filter(
        (message) =>
          (message.sender._id === user._id &&
            message.receiver._id === contacter._id) ||
          (message.sender._id === contacter._id &&
            message.receiver._id === user._id)
      );
      const converttedIMessages = convertMultipleMessagesToIMessages(
        contacterMessages,
        user._id as string
      );
      setSelectedMessages(converttedIMessages);
    } else {
      const converttedIMessages = convertMultipleMessagesToIMessages(
        contacterMessages,
        user._id as string
      );
      setSelectedMessages(converttedIMessages);
    }

    // update selected chat item to read if there are unread messages on selected chat.
    const updatedChatItem: IChatItem = { ...chatItem, unread: 0 };
    setSelectedChatItem(updatedChatItem);
    // set selecetd contacter
    setSelectedContacter(contacter);
    setSelectedMessageLoading(false);
  };

  const handleUploadClick = () => fileInputRef.current?.click();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUploadLoading(true);

    const file = event.target.files?.[0];

    if (!file) {
      setUploadLoading(false);
      return;
    }

    const fileSizeInMB = file.size / (1024 * 1024);

    if (fileSizeInMB > MAX_FILE_SIZE_MB) {
      toast.error("Max file size is 10 MB");
      setUploadLoading(false);
      return;
    }
    setFiles((prev) => [...prev, file]);
    setUploadLoading(false);
  };

  const handleUploadDelete = (idx: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== idx));
  };

  const handleSend = async () => {
    try {
      if (!user || !selectedContacter || !selectedChatItem) return;
      const totalMessages = messages.length;
      debugger;
      const waitForNewMessage = new Promise<Message>((resolve) => {
        const unsubscribe = store.subscribe(() => {
          const state = store.getState();
          const latestMessage =
            state.message.messages[state.message.messages.length - 1];
          if (
            latestMessage._id &&
            totalMessages < state.message.messages.length
          ) {
            unsubscribe();
            resolve(latestMessage);
          }
        });
      });
      if (files.length > 0) {
        // const fileDataArray = await Promise.all(
        //   files.map(async (file) => {
        //     const arrayBuffer = await file.arrayBuffer();
        //     return {
        //       name: file.name,
        //       type: file.type,
        //       size: file.size,
        //       data: Array.from(new Uint8Array(arrayBuffer)),
        //     };
        //   })
        // );
        // socket.emit(
        //   "message-send:files",
        //   user._id,
        //   selectedContacter._id,
        //   user.name,
        //   text,
        //   fileDataArray
        // );
        // await waitForNewMessage;
        // setText("");
        // setFiles([]);
      } else {
        if (text === "") return;
        socket.emit(
          "message-send:text",
          user._id,
          selectedContacter._id,
          user.name,
          text
        );
        const latestMessage = await waitForNewMessage;
        const newMessage: IMessage = {
          ...latestMessage,
          _id: latestMessage._id as string,
          position: latestMessage.sender._id === user._id ? "right" : "left",
          unread: latestMessage.status !== "read" ? 1 : 0,
        };
        setSelectedMessages([...selectedMessages, newMessage]);
        const updatedSelectedChatItem: IChatItem = {
          ...selectedChatItem,
          subtitle: latestMessage.text,
        };
        const updatedChatList = chatList.map((chat) =>
          chat._id === selectedChatItem._id
            ? { ...chat, subtitle: latestMessage.text }
            : chat
        );
        setChatList(updatedChatList);
        setSelectedChatItem(updatedSelectedChatItem);
        setText("");
      }
    } catch (error) {
      console.error("handle send error: ", error);
    }
  };

  // Create separate debounce instances
  const debouncedStopTyping = debounce(() => {
    if (!selectedContacter || !user) return;
    socket.emit("message:stop-typing", selectedContacter._id, user);
    setIsTyping(false);
  }, 2000);

  const delayedLoader = debounce(() => {
    setShowTypingLoader(true);
  }, 1000);

  const handleChatInputChange = (val: string) => {
    if (!selectedContacter || !user) return;

    setText(val);

    // Clear previous debounce
    debouncedStopTyping.cancel();
    delayedLoader.cancel();

    // Immediate actions
    if (!isTyping) {
      socket.emit("message:start-typing", selectedContacter._id, user);
      setIsTyping(true);
      delayedLoader(); // Start loader delay
    }

    // Restart debounce timer
    debouncedStopTyping();
  };

  useEffect(() => {
    return () => {
      debouncedStopTyping.cancel();
      delayedLoader.cancel();
    };
  }, []);

  useEffect(() => {
    const updateRealTimeChatItem = async (formattedChatList: IChatItem[]) => {
      if (
        selectedContacter &&
        currentSenderId &&
        selectedContacter._id === currentSenderId &&
        currentMessageId
      ) {
        // wait for message's read in redux store.
        const waitForUpdateMessage = new Promise<Message>((resolve) => {
          const unsubscribe = store.subscribe(() => {
            const state = store.getState();
            const updatedMessage = state.message.messages.find(
              (message) => message._id === currentMessageId
            );
            if (
              updatedMessage &&
              updatedMessage._id &&
              updatedMessage.status === "read"
            ) {
              unsubscribe();
              resolve(updatedMessage);
            }
          });
        });
        socket.emit("message:read", currentMessageId);
        await waitForUpdateMessage;
        const updatedChatList = formattedChatList.map((chat) =>
          chat._id === currentSenderId ? { ...chat, unread: 0 } : chat
        );
        setChatList(updatedChatList);
      } else {
        setChatList(formattedChatList);
      }
    };

    if (user) {
      if (selectedContacter) {
        const selectedContacterMessages = messages.filter(
          (message) =>
            (message.sender._id === user._id &&
              message.receiver._id === selectedContacter._id) ||
            (message.sender._id === selectedContacter._id &&
              message.receiver._id === user._id)
        );
        const converttedIMessages = convertMultipleMessagesToIMessages(
          selectedContacterMessages,
          user._id as string
        );
        setSelectedMessages(converttedIMessages);
      }

      const converttedChatList = convertMultipleIChatItems(
        user._id as string,
        user.contacts,
        messages
      );
      // when user is looking at the selected contacter's messaging, update his chat item to read.
      updateRealTimeChatItem(converttedChatList);
    }

    if (params.contacterId && user) {
      const contacter = user.contacts.find(
        (contacter) => contacter._id === params.contacterId
      );
      if (!contacter || !user) return;
      const contacterMessages = messages.filter(
        (message) => message.sender._id === contacter._id
      );
      const chatItem: IChatItem = {
        _id: contacter._id ?? "",
        avatar: contacter.avatar ?? "",
        alt: contacter.name ?? "",
        status: contacter.status ?? "offline",
        date: new Date(),
        title: contacter.name ?? "",
        subtitle:
          contacterMessages.length > 0
            ? contacterMessages[contacterMessages.length - 1].text
            : "",
        unread: contacterMessages.filter((message) => message.status !== "read")
          .length,
      };
      setSelectedContacter(contacter);
      setSelectedChatItem(chatItem);
    }
  }, [params, user, messages]);

  return (
    <div className="w-[80%] mx-auto py-8 flex flex-col gap-14">
      {loading && <Spinner />}
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
          {selectedMessageLoading ? (
            <div className="w-full h-full flex flex-col items-center justify-center">
              <Loader />
            </div>
          ) : (
            <>
              {/* Messages Container */}
              <MessageBoxGroup messages={selectedMessages} />
              {/* Fixed Input Container */}
              <div className="sticky bottom-0 bg-transparent pt-4">
                {showTypingLoader &&
                  typingUser &&
                  selectedContacter &&
                  selectedContacter._id === typingUser._id && (
                    <div className="p-2">
                      <TypingLoader name={typingUser.name ?? ""} />
                    </div>
                  )}
                <div className="flex flex-row items-end gap-2 p-1">
                  <ChatInput
                    placeholder="Type your message here..."
                    value={text}
                    onChange={handleChatInputChange}
                  />
                  <Tooltip message="Send">
                    <button
                      className={`p-2 rounded-lg shrink-0 transition-all duration-300 ease-in-out ${
                        selectedContacter
                          ? "bg-white cursor-pointer hover:bg-black/10 hover:backdrop-blur-sm hover:shadow-lg"
                          : "bg-gray-300 cursor-not-allowed"
                      }`}
                      disabled={!selectedContacter}
                      onClick={handleSend}
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
                    accept="image/*,video/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.rar"
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
            </>
          )}
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
