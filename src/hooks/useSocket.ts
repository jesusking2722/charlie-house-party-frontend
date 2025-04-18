import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSocket } from "../lib/socketInstance";
import {
  addNewApplicantToSelectedParty,
  addNewParty,
} from "../redux/slices/partySlice";
import { RootState } from "../redux/store";
import { Applicant, Message, Notification, Party, User } from "../types";
import { addNewNotification, setAuthUser } from "../redux/slices/authSlice";
import toast from "react-hot-toast";
import { addNewApplicant } from "../redux/slices/applicantSlice";
import {
  addNewMessage,
  setCurrentMessageId,
  setCurrentSenderId,
  updateMessage,
  updateMessageToRead,
} from "../redux/slices/messageSlice";

const useSocket = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!user) return;

    const socket = getSocket();

    const handleNewParty = (newParty: Party) => {
      dispatch(addNewParty({ newParty }));
    };

    const handleNewNotification = (newNotification: Notification) => {
      dispatch(addNewNotification({ newNotification }));
      toast.success("New notification added");
    };

    const handleNewApplied = (newApplicant: Applicant, partyId: string) => {
      dispatch(
        addNewApplicantToSelectedParty({
          newApplicant,
          selectedPartyId: partyId,
        })
      );
      dispatch(addNewApplicant({ newApplicant }));
    };

    const handleUpdateMeViaSocket = (user: User) => {
      dispatch(setAuthUser({ user }));
    };

    const handleNewMessage = (
      newMessage: Message,
      senderId: string,
      messageId: string
    ) => {
      dispatch(addNewMessage({ newMessage }));
      dispatch(setCurrentSenderId({ senderId }));
      dispatch(setCurrentMessageId({ messageId }));
    };

    const handleUpdateMessage = (updatedMessage: Message) => {
      dispatch(updateMessage({ updatedMessage }));
    };

    const handleUpdateMultipleMessagesRead = (updatedMessages: Message[]) => {
      dispatch(updateMessageToRead({ updatedMessages }));
    };

    // party
    socket.on("party:created", handleNewParty);

    // applicant
    socket.on("applicant:created", handleNewApplied);

    // notification
    socket.on("notification", handleNewNotification);

    // direct
    socket.on("update-me", handleUpdateMeViaSocket);

    // message
    socket.on("message-received:text", handleNewMessage);
    socket.on("message:update", handleUpdateMessage);
    socket.on(
      "message:updated-multiple-read",
      handleUpdateMultipleMessagesRead
    );

    return () => {
      socket.off("party:created", handleNewParty);
      socket.off("applicant:created", handleNewApplied);
      socket.off("notification", handleNewNotification);
      socket.off("update-me", handleUpdateMeViaSocket);
      socket.off("message-received:text", handleNewMessage);
      socket.off("message:update", handleUpdateMessage);
      socket.off(
        "message:updated-multiple-read",
        handleUpdateMultipleMessagesRead
      );
    };
  }, [dispatch, user]);
};

export default useSocket;
