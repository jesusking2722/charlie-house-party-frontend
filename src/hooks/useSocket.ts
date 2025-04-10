import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../lib/socketInstance";
import { addNewParty } from "../redux/slices/partySlice";
import { RootState } from "../redux/store";
import { Notification, Party } from "../types";
import { addNewNotification } from "../redux/slices/authSlice";
import toast from "react-hot-toast";

const useSocket = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!user) return;

    const handleNewParty = (newParty: Party) => {
      dispatch(addNewParty({ newParty }));
    };

    const handleNewNotification = (newNotification: Notification) => {
      debugger;
      dispatch(addNewNotification({ newNotification }));
      toast.success("New notification added");
    };

    socket.on("party:created", handleNewParty);
    socket.on("notification:party-opened", handleNewNotification);

    return () => {
      socket.off("party:created", handleNewParty);
    };
  }, [dispatch, user]);
};

export default useSocket;
