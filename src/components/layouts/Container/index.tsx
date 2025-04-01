import Header from "../Header";
import Navbar from "../Navbar";
import { useLocation } from "react-router";

const Container = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const isAuthPage =
    pathname.includes("register") || pathname.includes("login");

  return (
    <div
      className="min-h-screen w-full flex flex-row justify-between bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('../assets/pngs/bg.png')` }}
    >
      {!isAuthPage && (
        <aside className="hidden md:block md:w-[15%] lg:w-[12%] xl:w-[10%]">
          <Navbar />
        </aside>
      )}
      <main className="flex flex-1 flex-col w-full">
        <Header />
        <div className="flex-1 p-4">{children}</div>
      </main>
    </div>
  );
};

export default Container;
