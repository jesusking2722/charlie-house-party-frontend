import { Link } from "react-router";
import { ProfileDropdown } from "../../common";

const Header = () => {
  return (
    <header className="flex w-[80%] mx-auto flex-row items-center justify-between p-2">
      <Link to="/" className="flex flex-row items-center gap-4">
        <img
          src="http://localhost:3000/logo.png"
          alt="LOGO"
          className="w-[80px] h-auto"
        />
        <h1 className="gradient-text font-semibold text-2xl">HOUSE PARTY</h1>
      </Link>
      <div className="flex flex-row items-center gap-4">
        <ProfileDropdown />
      </div>
    </header>
  );
};

export default Header;
