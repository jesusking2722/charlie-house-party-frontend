import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../lib/socketInstance";
import { addNewParty } from "../redux/slices/partySlice";
import { RootState } from "../redux/store";
import { Party } from "../types";

const useSocket = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!user) return;

    const handleNewParty = (newParty: Party) => {
      debugger
      dispatch(addNewParty({ newParty }));
    };

    socket.on("party:created", handleNewParty);

    return () => {
      socket.off("party:created", handleNewParty);
    };
  }, [dispatch, user]);
};

export default useSocket;
