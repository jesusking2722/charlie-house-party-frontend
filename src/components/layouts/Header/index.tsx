import { ProfileDropdown } from "../../common";

const Header = () => {
  return (
    <header className="flex w-[80%] mx-auto flex-row items-center justify-between p-2">
      <div className="flex flex-row items-center gap-4">
        <img src="./logo.png" alt="LOGO" className="w-[80px] h-auto" />
        <h1 className="text-white font-semibold text-2xl">House Party</h1>
      </div>
      <div className="flex flex-row items-center gap-4">
        <ProfileDropdown />
      </div>
    </header>
  );
};

export default Header;
