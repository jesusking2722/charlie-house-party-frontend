import React from "react";
import "./App.css";
import { Route, Routes } from "react-router";
import { Container } from "./components";
import {
  Home,
  Login,
  NotFound,
  Onboarding,
  Pricing,
  Profile,
  Register,
} from "./pages";
// import { useAuth } from "./hooks";
import { Toaster } from "react-hot-toast";

import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
import { bsc } from "@reown/appkit/networks";

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
  // useAuth();

  return (
    <Container>
      <Routes>
        <Route path="/register" Component={Register} />
        <Route path="/login" Component={Login} />
        <Route path="/onboarding" Component={Onboarding} />
        <Route path="/dashboard" Component={Home} />
        <Route path="/profile" Component={Profile} />
        <Route path="/pricing" Component={Pricing} />
        <Route path="*" Component={NotFound} />
      </Routes>
      <Toaster position="top-right" reverseOrder={false} />
    </Container>
  );
}

export default App;
