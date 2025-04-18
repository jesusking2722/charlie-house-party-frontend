import { IChatItem, IMessage, Message, User } from "../types";

export const convertMultipleMessagesToIMessages = (
  messages: Message[],
  userId: string
): IMessage[] => {
  const iMessages: IMessage[] = messages.map((message) => ({
    ...message,
    _id: message._id as string,
    position: message.sender._id === userId ? "right" : "left",
    unread: 0,
  }));
  return iMessages;
};

export const convertMultipleIChatItems = (
  userId: string,
  contacts: User[],
  messages: Message[]
): IChatItem[] => {
  const chatItems: IChatItem[] = contacts.map((contacter) => {
    const contacterMessages = messages.filter(
      (message) =>
        message.receiver._id === userId && contacter._id === message.sender._id
    );
    return {
      _id: contacter._id ?? "",
      avatar: contacter.avatar ?? "",
      alt: contacter.name ?? "",
      status: contacter.status ?? "offline",
      date:
        contacterMessages.length > 0
          ? contacterMessages[contacterMessages.length - 1].date
          : new Date(),
      title: contacter.name ?? "",
      subtitle: messages.length > 0 ? messages[messages.length - 1].text : "",
      unread: contacterMessages.filter((message) => message.status !== "read")
        .length,
    };
  });
  return chatItems;
};

export const convertSingleIChatItem = (
  userId: string,
  contacter: User,
  messages: Message[]
): IChatItem => {
  const contacterMessages = messages.filter(
    (message) =>
      message.receiver._id === userId && contacter._id === message.sender._id
  );
  return {
    _id: contacter._id ?? "",
    avatar: contacter.avatar ?? "",
    alt: contacter.name ?? "",
    status: contacter.status ?? "offline",
    date: new Date(),
    title: contacter.name ?? "",
    subtitle: messages.length > 0 ? messages[messages.length - 1].text : "",
    unread: contacterMessages.filter((message) => message.status !== "read")
      .length,
  };
};
