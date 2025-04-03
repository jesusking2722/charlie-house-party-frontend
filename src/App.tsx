import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router";
import { Container, Spinner } from "./components";
import {
  Home,
  Login,
  NotFound,
  Onboarding,
  Parites,
  Party,
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
import { fetchAllUsers, fetchMe } from "./lib/scripts";
import { setAuthUser } from "./redux/slices/authSlice";
import { setUsers } from "./redux/slices/usersSlice";

const metadata = {
  name: "House Party | Charlie Unicorn AI",
  description: "House party application powered by Charlie Unicorn AI",
  url: "https://charlieunicornai-houseparty.vercel.app",
  icons: ["https://charlieunicornai-houseparty.vercel.app/logo.png"],
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

    const token = localStorage.getItem("Authorization");
    if (token) {
      const decoded = jwtDecode(token) as any;
      fetchMyInfo(decoded.id);
      fetchAllUsersInfo();
    }
  }, [dispatch]);

  return (
    <Container>
      <Routes>
        <Route path="/register" Component={Register} />
        <Route path="/login" Component={Login} />
        <Route path="/onboarding" Component={Onboarding} />
        <Route path="/dashboard" Component={Home} />
        <Route path="/profile/:userId" Component={Profile} />
        <Route path="/pricing" Component={Pricing} />
        <Route path="/parties" Component={Parites} />
        <Route path="/parties/:partyId" Component={Party} />
        <Route path="*" Component={NotFound} />
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
      {loading && <Spinner />}
    </Container>
  );
}

export default App;
