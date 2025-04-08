import {Icon} from "@iconify/react";
import {useState} from "react";
import {Notification as NotificationType} from "../../types";
import {NotificationGroup} from "../../components";

const Notification = () => {
    const [notifications, setNotifications] = useState<NotificationType[]>([]);

    return <div className='w-[80%] mx-auto py-8 flex flex-col gap-14'>
        <div className='w-full flex flex-row gap-2 items-center'>
            <h1 className='text-3xl text-black font-semibold'>Notification</h1>
            <Icon icon='solar:bell-bing-bold-duotone' className='w-8 h-8 text-green-500'/>
        </div>
        {notifications.length === 0 ? <div className='w-full flex flex-col items-center justify-center gap-4'></div> :
            <div className='w-full'>
                <NotificationGroup notifications={notifications} setNotifications={setNotifications}/>
            </div>
        }
    </div>;
};

export default Notification;