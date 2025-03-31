import Navbar from "../Navbar";
import { useLocation } from "react-router";

const Container = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();

  return (
    <div
      className="min-h-screen w-full"
      style={{
        background: "url('../assets/pngs/bg.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {!pathname.includes("register") && !pathname.includes("login") && (
        <Navbar />
      )}
      {children}
    </div>
  );
};

export default Container;
