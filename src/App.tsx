import React, { useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Spinner, ContainerRoute } from "./components";
import {
  CreateParty,
  Home,
  Login,
  NotFound,
  Notification,
  Onboarding,
  Parties,
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
import "react-chat-elements/dist/main.css";
import { BASE_URL } from "./constant";
import useSocket from "./hooks/useSocket";
import useInit from "./hooks/useInit";
// import socket from "./lib/socketInstance";
import { jwtDecode } from "jwt-decode";

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
  useAuth();
  useSocket();
  let { loading } = useInit();

  return (
    <>
      <Routes>
        <Route element={<ContainerRoute />}>
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="onboarding" element={<Onboarding />} />
          <Route index path="dashboard" element={<Home />} />
          <Route path="profile/:userId" element={<Profile />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="parties" element={<Parties />} />
          <Route path="parties/:partyId" element={<PartyPreview />} />
          <Route path="create-party" element={<CreateParty />} />
          <Route path="notification" element={<Notification />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      <Toaster position="top-right" reverseOrder={false} />
      {loading && <Spinner />}
    </>
  );
}

export default App;
