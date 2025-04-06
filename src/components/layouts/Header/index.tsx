import { Link } from "react-router-dom";
import { ProfileDropdown } from "../../common";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import { User } from "../../../types";
import { BASE_URL } from "../../../constant";

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
      <Link to="dashboard" className="flex flex-row items-center gap-4">
        <img
          src={BASE_URL + "/logo.png"}
          alt="LOGO"
          className="w-[80px] h-auto"
        />
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
