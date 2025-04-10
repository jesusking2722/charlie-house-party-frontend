import { LinkIconButton, Spinner } from "../../common";
import { motion } from "motion/react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import { User } from "../../../types";
import { updateMe } from "../../../lib/scripts";
import { setAuthUser } from "../../../redux/slices/authSlice";

const Navbar = () => {
  const [unreadCount, setUnreadCount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { pathname } = useLocation();
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const updateReadNotifications = async () => {
    try {
      if (!user) return;
      if (unreadCount && unreadCount > 0) {
        const notifications = user.notifications ?? [];
        let updatedNotifications = notifications.map((notification) => {
          return {
            ...notification,
            read: true,
          };
        });
        const updatingUser: User = {
          ...user,
          notifications: updatedNotifications,
        };
        const response = await updateMe({ user: updatingUser });

        if (response.ok) {
          dispatch(setAuthUser({ user: response.data.user }));
          setUnreadCount(null);
        }
      }
    } catch (error) {
      console.log("update read notification error: ", error);
    }
  };

  useEffect(() => {
    if (user) {
      const unreads = user.notifications?.filter(
        (notification) => !notification.read
      ).length;
      if (unreads && unreads > 0) {
        setUnreadCount(unreads);
      }
    }
  }, [user]);

  return (
    <motion.div
      initial={{ x: -50 }}
      animate={{ x: 0 }}
      transition={{ type: "spring" }}
      className="w-[100px] fixed left-0 top-0 min-h-screen bg-black/5 backdrop-blur-sm shadow-lg"
    >
      {loading && <Spinner />}
      <nav className="py-14 px-4 text-center">
        <ul className="flex flex-col gap-4">
          <LinkIconButton
            label="Home"
            icon="solar:home-2-bold-duotone"
            path="dashboard"
            active={pathname.includes("dashboard")}
          />
          <LinkIconButton
            label="Create"
            icon="solar:document-add-bold-duotone"
            path="create-party"
            active={pathname.includes("create")}
          />
          <LinkIconButton
            label="Parties"
            icon="solar:documents-bold-duotone"
            path="parties"
            active={pathname.includes("parties")}
          />
          <LinkIconButton
            label="Notification"
            icon="solar:bell-bing-bold-duotone"
            path="notification"
            count={unreadCount}
            active={pathname.includes("notification")}
            onClick={updateReadNotifications}
          />
          <LinkIconButton
            label="Chat"
            icon="solar:chat-line-bold-duotone"
            path="chat"
            active={pathname.includes("chat")}
          />
          <LinkIconButton
            label="Shop"
            icon="solar:shop-bold-duotone"
            path=""
            active={pathname.includes("shop")}
          />
          <LinkIconButton
            label="Pricing"
            icon="solar:tag-price-bold-duotone"
            path="pricing"
            active={pathname.includes("pricing")}
          />
        </ul>
      </nav>
    </motion.div>
  );
};

export default Navbar;
