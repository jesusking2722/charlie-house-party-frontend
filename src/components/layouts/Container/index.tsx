import Footer from "../Footer";
import Header from "../Header";
import Navbar from "../Navbar";
import { useLocation } from "react-router";

const Container = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const isAuthPage =
    pathname.includes("register") ||
    pathname.includes("login") ||
    pathname.includes("onboarding") ||
    pathname.includes("not-found");

  return (
    <div
      className="min-h-screen w-full flex flex-row justify-between bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('../assets/pngs/bg.png')` }}
    >
      {!isAuthPage && (
        <aside className="">
          <Navbar />
        </aside>
      )}
      <main className="flex flex-1 flex-col w-full">
        {!isAuthPage && <Header />}
        <div className="flex-1 p-4">{children}</div>
        {!isAuthPage && <Footer />}
      </main>
    </div>
  );
};

export default Container;
