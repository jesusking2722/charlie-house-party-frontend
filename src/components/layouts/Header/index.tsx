import { Link } from "react-router";
import { ProfileDropdown } from "../../common";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import { User } from "../../../types";

const Header = () => {
  const [updatedUser, setUpdatedUser] = useState<User | null>(null);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user) {
      setUpdatedUser(user);
    }
  }, [user]);

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
        <ProfileDropdown
          avatar={updatedUser?.avatar ?? ""}
          name={updatedUser?.name ?? ""}
          userId={updatedUser?._id ?? ""}
        />
      </div>
    </header>
  );
};

export default Header;
