import {useLocation} from "react-router-dom";
import Footer from "../Footer";
import Header from "../Header";
import Navbar from "../Navbar";

const Container = ({children}: { children: React.ReactNode }) => {
    const {pathname} = useLocation();

    const isAuthPage = ["/register", "/login", "/onboarding"].includes(pathname);

    const isPartyDetailPage = pathname.startsWith("/parties/");
    const isProfileDetailPage = pathname.startsWith("/profile/");

    const isNotFound = !(
        isAuthPage ||
        isPartyDetailPage ||
        isProfileDetailPage ||
        [
            "/dashboard",
            "/profile",
            "/pricing",
            "/parties",
            "/create-party",
            '/notification'
        ].includes(pathname)
    );

    return (
        <div
            className="min-h-screen w-full flex flex-row justify-between bg-cover bg-center bg-no-repeat overflow-x-hidden"
            style={{backgroundImage: `url('../assets/pngs/bg.png')`}}
        >
            {!isAuthPage && !isNotFound && (
                <aside>
                    <Navbar/>
                </aside>
            )}
            <main className="flex flex-1 flex-col w-full">
                {!isAuthPage && !isNotFound && <Header/>}
                <div className="flex-1 p-4">{children}</div>
                {!isAuthPage && !isNotFound && <Footer/>}
            </main>
        </div>
    );
};

export default Container;
