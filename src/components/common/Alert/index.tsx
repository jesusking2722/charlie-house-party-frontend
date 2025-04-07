import {Icon} from "@iconify/react";
import {FC} from "react";

interface AlertProps {
    type: 'success' | 'error' | 'warning' | 'info';
    title: string,
    message: string,
}

const Alert: FC<AlertProps> = ({type, title, message}) => {
    return <div className={`w-full flex flex-row items-start gap-4 rounded-lg p-4 border ${type === 'success' ? 'bg-green-100' : type === 'info' ? 'bg-blue-100' :
        type === 'warning' ? 'bg-yellow-100' : 'bg-red-100'} ${type === 'success' ? 'border-green-500' : type === 'info' ? 'border-blue-500' :
        type === 'warning' ? 'border-yellow-500' : 'border-red-500'} shadow-lg`}>
        <Icon
            icon={type === 'success' ? 'solar:verified-check-bold' : type === 'info' ? 'solar:info-circle-broken'
                  : type === 'warning' ? 'solar:shield-warning-broken' : 'solar:folder-error-broken' }
            className={`w-6 h-6 ${type === 'success' ? 'text-green-500' : type === 'info' ? 'text-blue-500' :
                type === 'warning' ? 'text-yellow-500' : 'text-red-500'}`}
        />
        <div className='flex flex-1 flex-col gap-1 items-start'>
            <h3 className={`text-sm font-semibold ${type === 'success' ? 'text-green-500' : type === 'info' ? 'text-blue-500' : 
                type === 'warning' ? 'text-yellow-500' : 'text-red-500'
            }`}>{title}</h3>
            <h3 className={`text-xs ${type === 'success' ? 'text-green-500' : type === 'info' ? 'text-blue-500' :
                type === 'warning' ? 'text-yellow-500' : 'text-red-500'
            }`}>{message}</h3>
        </div>
    </div>
}

export default Alert;