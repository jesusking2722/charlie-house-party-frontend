import { Notification, User } from "../../../types";
import { BACKEND_BASE_URL } from "../../../constant";
import IconButton from "../IconButton";
import { getTimeAgo } from "../../../utils";
import { motion } from "framer-motion"; // Ensure you're using framer-motion correctly
import { useState } from "react";
import Spinner from "../Spinner";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { updateMe } from "../../../lib/scripts";
import { setAuthUser } from "../../../redux/slices/authSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const NotificationGroup = ({
  notifications,
  setNotifications,
}: {
  notifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleRemoveNotification = async (notification: Notification) => {
    try {
      if (!user) return;
      setLoading(true);
      const updatedNotifications = notifications.filter(
        (n) => n !== notification
      );
      const updatingUser: User = {
        ...user,
        notifications: updatedNotifications,
      };
      const response = await updateMe({ user: updatingUser });
      if (response.ok) {
        dispatch(setAuthUser({ user: response.data.user }));
        setNotifications(
          response.data.user?.notifications ?? updatedNotifications
        );
        toast.success("Notification removed");
      }
    } catch (error) {
      console.log("handle remove notification error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {loading && <Spinner />}
      {notifications.map((notification, index) => (
        <motion.div
          key={index}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.3, type: "spring", delay: index * 0.1 }}
          className="flex items-start p-4 rounded-lg bg-white/20 backdrop-blur-sm border border-white hover:shadow-lg hover:border-[#c4f70f]"
        >
          <img
            src={
              BACKEND_BASE_URL +
              `${
                notification.type === "announcement"
                  ? "/logo.png"
                  : notification.type.includes("party")
                  ? notification?.party?.creator?.avatar
                  : notification.type.includes("applicant")
                  ? notification?.applicant?.applier?.avatar
                  : notification.type.includes("sticker")
                  ? notification?.sticker?.image
                  : ""
              }`
            }
            alt={notification.content}
            className="w-[80px] h-[80px] rounded-full object-cover object-center mt-4"
          />
          <div className="ml-3 overflow-hidden w-full">
            <div className="flex flex-row items-center justify-between">
              <h3 className="text-sm font-semibold">
                {notification.type === "announcement" ? (
                  "Announcement"
                ) : notification.type.includes("party") ? (
                  <span>
                    {notification.type === "party-opened"
                      ? `${notification.party?.creator?.name} opened`
                      : notification.type === "party-completed"
                      ? `${notification.party?.creator?.name} completed`
                      : `${notification.party?.creator?.name} canceled`}
                    {notification.type === "party-opened" && (
                      <span className="text-blue-500">
                        {" "}
                        {notification.party?.title}{" "}
                      </span>
                    )}
                    {notification.type === "party-completed" && (
                      <span className="text-green-500">
                        {" "}
                        {notification.party?.title}{" "}
                      </span>
                    )}
                    {notification.type === "party-cancelled" && (
                      <span className="text-red-400">
                        {" "}
                        {notification.party?.title}{" "}
                      </span>
                    )}
                  </span>
                ) : notification.type.includes("applicant") ? (
                  <span>
                    {notification.type === "applicant-applied"
                      ? `${notification.applicant?.applier.name} applied your`
                      : notification.type === "applicant-accepted"
                      ? `${notification.party?.creator?.name} accepted your application`
                      : `${notification.party?.creator?.name} rejected your application`}
                    {notification.type === "applicant-applied" && (
                      <>
                        <span className="text-green-500">
                          {" "}
                          {notification.party?.title}
                        </span>
                        <span>
                          {notification.applicant?.stickers &&
                            notification.applicant.stickers.length > 0 &&
                            ` with ${notification.applicant.stickers.length} stickers`}
                        </span>
                      </>
                    )}
                  </span>
                ) : notification.type.includes("sticker") ? (
                  <span>
                    {notification.type === "sticker-added"
                      ? `${notification.sticker?.name} sticker newly added`
                      : `Someone bought sticker`}
                  </span>
                ) : (
                  ""
                )}
              </h3>
              <div className="flex flex-row items-center gap-2">
                <IconButton
                  icon="solar:trash-bin-minimalistic-bold-duotone"
                  onClick={() => handleRemoveNotification(notification)}
                />
                <IconButton
                  icon="solar:arrow-right-line-duotone"
                  onClick={() => {
                    navigate(
                      notification.type.includes("party")
                        ? `/parties/${notification.party?._id}`
                        : notification.type.includes("applicant")
                        ? `/parties/${notification.party?._id}`
                        : ""
                    );
                  }}
                />
              </div>
            </div>
            <p className="text-xs text-black mt-2">
              {notification.type.includes("party")
                ? notification?.party?.description
                : notification.type.includes("applicant")
                ? notification.applicant?.applicant
                : notification.content}
            </p>
            <div className="w-full flex flex-row justify-end mt-2">
              <span className="text-xs text-blue-500">
                {getTimeAgo(notification.createdAt ?? new Date())}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default NotificationGroup;
