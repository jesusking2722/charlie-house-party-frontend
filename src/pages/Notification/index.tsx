import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { Notification as NotificationType } from "../../types";
import { NotificationGroup } from "../../components";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { BASE_URL } from "../../constant";

const Notification = () => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user) {
      setNotifications(user.notifications ?? []);
    }
  }, [user]);

  return (
    <div className="w-[80%] mx-auto py-8 flex flex-col gap-8">
      <div className="w-full flex flex-row gap-2 items-center">
        <h1 className="text-3xl text-black font-semibold">Notification</h1>
        <Icon
          icon="solar:bell-bing-bold-duotone"
          className="w-8 h-8 text-green-500"
        />
      </div>
      {notifications.length === 0 ? (
        <div className="w-full flex flex-col items-center justify-center gap-4">
          <img
            src={BASE_URL + "/assets/pngs/empty.png"}
            alt="Empty notification"
            className="w-1/4 h-auto object-cover object-center"
          />
          <h1 className="text-2xl text-black font-semibold">
            No notifications yet
          </h1>
          <p className="text-gray-500 text-center text-sm">
            You will receive notifications when someone invites you to a party
            or when a party is completed or canceled <br />
            or when new sticker will be listed in the shop or when someone
            applies to your party.
          </p>
        </div>
      ) : (
        <div className="w-full">
          <NotificationGroup
            notifications={notifications}
            setNotifications={setNotifications}
          />
        </div>
      )}
    </div>
  );
};

export default Notification;
