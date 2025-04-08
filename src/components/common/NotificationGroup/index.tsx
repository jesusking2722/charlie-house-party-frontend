import {Notification} from "../../../types";
import {BACKEND_BASE_URL} from "../../../constant";
import IconButton from "../IconButton";
import {getTimeAgo} from "../../../utils";
import {motion} from 'motion/react';

const NotificationGroup = ({notifications, setNotifications}: {
    notifications: Notification[],
    setNotifications: (notifications: Notification[]) => void;
}) => {
    const handleRemoveNotification = (notification: Notification) => {
        setNotifications(notifications);
    }

    return <div className='w-full flex flex-col gap-4'>
        {notifications.map((notification, index) => (
            <motion.div
                key={index}
                initial={{y: 50, opacity: 0}}
                animate={{y: 0, opacity: 1}}
                exit={{y: -50, opacity: 0}}
                transition={{duration: 0.3, type: "spring", delay: index * 0.1}}
                className='w-full flex flex-1 flex-row items-center gap-4 p-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white hover:shadow-lg hover:border-[#c4f70f]'
            >
                <img
                    src={
                        BACKEND_BASE_URL + `${notification.type === 'announcement' ? '/logo.png'
                            : notification.type.includes('party') ? notification?.party?.creator?.avatar
                                : notification.type.includes('applicant') ? notification?.applicant?.applier?.avatar
                                    : notification.type.includes('sticker') ? notification?.sticker?.image
                                        : ''}`
                    }
                    alt={notification.content} className='w-10 h-10 rounded-full'
                />
                <div className='flex flex-1 flex-col items-start'>
                    <div className='w-full flex flex-row items-center justify-between'>
                        <h3 className='text-sm font-semibold'>
                            {
                                notification.type === 'announcement' ? 'Announcement'
                                    : notification.type.includes('party') ? `${notification.type === 'party-opened' ? `${notification.party?.creator?.name} opened ${
                                                <span className='text-blue-500'>{notification?.party?.title}</span>}`
                                            : notification.type === 'party-completed' ? `${notification.party?.creator?.name} completed ${
                                                    <span className='text-green-500'>{notification?.party?.title}</span>}`
                                                : `${notification.party?.creator?.name} canceled ${<span
                                                    className='text-gray-400'>{notification?.party?.title}</span>}`} party`
                                        : notification.type.includes('applicant') ? `${notification.type === 'applicant-applied' ? `${notification.applicant?.applier?.name} applied to your ${
                                                <span
                                                    className='text-green-500'>{notification?.party?.title}</span>}` : notification.type === 'applicant-accepted' ? `${notification.party?.creator?.name} accepted your application` : `${notification.party?.creator?.name} rejected your application`}`
                                            : notification.type.includes('sticker') ? `${notification.type === 'sticker-added' ? `${notification.sticker?.name} sticker newly added` : `Someone bought sticker`}` : ''
                            }
                        </h3>
                        <div className='flex flex-row items-center gap-2'>
                            <IconButton icon='solar:trash-bin-minimalistic-bold-duotone'
                                        onClick={() => handleRemoveNotification(notification)}/>
                            <IconButton icon='solar:arrow-right-line-duotone'/>
                        </div>
                    </div>
                    <p className='w-full h-[150px] overflow-hidden text-xs text-black'>
                        {
                            notification.type.includes('party') ? notification?.party?.description
                                : notification.type.includes('applicant') ? notification.applicant?.applicant : notification.content}
                    </p>
                    <div className='w-full flex flex-row justify-end'>
                        <span
                            className='text-xs text-blue-500'>{getTimeAgo(notification.createdAt ?? new Date())}</span>
                    </div>
                </div>
            </motion.div>
        ))}
    </div>
}

export default NotificationGroup;