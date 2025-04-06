import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../lib/socketInstance";
import { addNewParty } from "../redux/slices/partySlice";
import { RootState } from "../redux/store";
import { Party } from "../types";

const useSocket = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) return;

    const handleNewParty = (newParty: Party) => {
      dispatch(addNewParty({ newParty }));
    };

    socket.on("party:created", handleNewParty);

    return () => {
      socket.off("party:created", handleNewParty);
    };
  }, [dispatch, isAuthenticated]);
};

export default useSocket;
