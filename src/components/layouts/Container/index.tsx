import { useLocation } from "react-router";
import Footer from "../Footer";
import Header from "../Header";
import Navbar from "../Navbar";

const Container = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();

  const isAuthPage = ["/register", "/login", "/onboarding"].includes(pathname);

  const isNotFound = ![
    "/register",
    "/login",
    "/onboarding",
    "/dashboard",
    "/profile",
    "/pricing",
  ].includes(pathname);

  return (
    <div
      className="min-h-screen w-full flex flex-row justify-between bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('../assets/pngs/bg.png')` }}
    >
      {!isAuthPage && !isNotFound && (
        <aside>
          <Navbar />
        </aside>
      )}
      <main className="flex flex-1 flex-col w-full">
        {!isAuthPage && !isNotFound && <Header />}
        <div className="flex-1 p-4">{children}</div>
        {!isAuthPage && !isNotFound && <Footer />}
      </main>
    </div>
  );
};

export default Container;
