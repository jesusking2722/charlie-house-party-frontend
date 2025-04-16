import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSocket } from "../lib/socketInstance";
import {
  addNewApplicantToSelectedParty,
  addNewParty,
} from "../redux/slices/partySlice";
import { RootState } from "../redux/store";
import { Applicant, Notification, Party } from "../types";
import { addNewNotification } from "../redux/slices/authSlice";
import toast from "react-hot-toast";
import { addNewApplicant } from "../redux/slices/applicantSlice";

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

    // party
    socket.on("party:created", handleNewParty);

    // applicant
    socket.on("applicant:created", handleNewApplied);

    // notification
    socket.on("notification", handleNewNotification);

    return () => {
      socket.off("party:created", handleNewParty);
      socket.off("applicant:created", handleNewApplied);
      socket.off("notification", handleNewNotification);
    };
  }, [dispatch, user]);
};

export default useSocket;
