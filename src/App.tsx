import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Container, Spinner } from "./components";
import {
  CreateParty,
  Home,
  Login,
  NotFound,
  Onboarding,
  Parites,
  PartyPreview,
  Pricing,
  Profile,
  Register,
} from "./pages";
import { useAuth } from "./hooks";
import { Toaster } from "react-hot-toast";

import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { bsc } from "@reown/appkit/networks";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import {fetchAllParties, fetchAllUsers, fetchMe} from "./lib/scripts";
import { setAuthUser } from "./redux/slices/authSlice";
import { setUsers } from "./redux/slices/usersSlice";
import "react-chat-elements/dist/main.css";
import { BASE_URL } from "./constant";
import useSocket from "./hooks/useSocket";
import {setParty} from "./redux/slices/partySlice";

const metadata = {
  name: "House Party | Charlie Unicorn AI",
  description: "House party application powered by Charlie Unicorn AI",
  url: BASE_URL,
  icons: [`${BASE_URL}/logo.png`],
};

createAppKit({
  adapters: [new EthersAdapter()],
  networks: [bsc],
  metadata,
  projectId: "372af36aa30df14521fcca840c78291f",
  features: {
    analytics: true,
    email: false,
    socials: false,
  },
  themeMode: "light",
});

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  useAuth();
  useSocket();

  useEffect(() => {
    const fetchMyInfo = async (id: string) => {
      try {
        setLoading(true);
        const response = await fetchMe(id);
        if (response.ok) {
          dispatch(setAuthUser({ user: response.data.user }));
        }
      } catch (error) {
        console.log("fetch my info error: ", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchAllUsersInfo = async () => {
      try {
        setLoading(true);
        const response = await fetchAllUsers();
        if (response.ok) {
          const { users } = response.data;
          dispatch(setUsers({ users }));
        }
      } catch (error) {
        console.log("fetch all users info error: ", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchAllPartiesInfo = async () => {
      try {
        const response = await fetchAllParties();
        if(response.ok) {
          const { parties } = response.data;
          dispatch(setParty({parties}));
        }
      } catch (error) {
        console.log("fetch all parties info error: ", error);
      }
    }

    const token = localStorage.getItem("Authorization");
    if (token) {
      const decoded = jwtDecode(token) as any;
      fetchMyInfo(decoded.id);
      fetchAllUsersInfo();
      fetchAllPartiesInfo();
    }
  }, [dispatch]);

  return (
    <Container>
      <Routes>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="onboarding" element={<Onboarding />} />
        <Route index path="dashboard" element={<Home />} />
        <Route path="profile/:userId" element={<Profile />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="parties" element={<Parites />} />
        <Route path="parties/:partyId" element={<PartyPreview />} />
        <Route path="create-party" element={<CreateParty />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
      {loading && <Spinner />}
    </Container>
  );
}

export default App;
