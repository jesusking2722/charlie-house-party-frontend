import { useEffect, useState } from "react";
import {
  fetchAllMessages,
  fetchAllParties,
  fetchAllUsers,
  fetchMe,
} from "../lib/scripts";
import { setAuthUser } from "../redux/slices/authSlice";
import { setUsers } from "../redux/slices/usersSlice";
import { setParty } from "../redux/slices/partySlice";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setMessage } from "../redux/slices/messageSlice";

const useInit = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const fetchMyInfo = async (id: string) => {
    try {
      const response = await fetchMe(id);
      if (response.ok) {
        dispatch(setAuthUser({ user: response.data.user }));
      }
    } catch (error) {
      console.log("fetch my info error: ", error);
    }
  };

  const fetchAllUsersInfo = async () => {
    try {
      const response = await fetchAllUsers();
      if (response.ok) {
        const { users } = response.data;
        dispatch(setUsers({ users }));
      }
    } catch (error) {
      console.log("fetch all users info error: ", error);
    }
  };

  const fetchAllPartiesInfo = async () => {
    try {
      const response = await fetchAllParties();
      if (response.ok) {
        const { parties } = response.data;
        dispatch(setParty({ parties }));
      }
    } catch (error) {
      console.log("fetch all parties info error: ", error);
    }
  };

  const fetchAllMessagesInfo = async (userId: string) => {
    try {
      debugger;
      const response = await fetchAllMessages(userId);
      if (response.ok) {
        const { messages } = response.data;
        dispatch(setMessage({ messages }));
      }
    } catch (error) {
      console.error("fetch all messages info error: ", error);
    }
  };

  const fetchAllInitialInfo = async () => {
    const token = localStorage.getItem("Authorization");
    if (token) {
      setLoading(true);
      const decoded = jwtDecode(token) as any;
      await fetchMyInfo(decoded.id);
      await fetchAllUsersInfo();
      await fetchAllPartiesInfo();
      await fetchAllMessagesInfo(decoded.id);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchMyInfo = async (id: string) => {
      try {
        const response = await fetchMe(id);
        if (response.ok) {
          dispatch(setAuthUser({ user: response.data.user }));
        }
      } catch (error) {
        console.log("fetch my info error: ", error);
      }
    };

    const fetchAllUsersInfo = async () => {
      try {
        const response = await fetchAllUsers();
        if (response.ok) {
          const { users } = response.data;
          dispatch(setUsers({ users }));
        }
      } catch (error) {
        console.log("fetch all users info error: ", error);
      }
    };

    const fetchAllPartiesInfo = async () => {
      try {
        const response = await fetchAllParties();
        if (response.ok) {
          const { parties } = response.data;
          dispatch(setParty({ parties }));
        }
      } catch (error) {
        console.log("fetch all parties info error: ", error);
      }
    };

    const fetchAllMessagesInfo = async (userId: string) => {
      try {
        const response = await fetchAllMessages(userId);
        if (response.ok) {
          const { messages } = response.data;
          dispatch(setMessage({ messages }));
        }
      } catch (error) {
        console.error("fetch all messages info error: ", error);
      }
    };

    const token = localStorage.getItem("Authorization");
    if (token) {
      setLoading(true);
      const decoded = jwtDecode(token) as any;
      fetchMyInfo(decoded.id);
      fetchAllUsersInfo();
      fetchAllPartiesInfo();
      fetchAllMessagesInfo(decoded.id);
      setLoading(false);
    }
  }, [dispatch, pathname]);

  return { loading, fetchAllInitialInfo };
};

export default useInit;
