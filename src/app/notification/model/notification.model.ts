import {NotificationType} from "./notification-type.enum";

export interface Notification {
    message: string;
    seen: boolean;
    type: NotificationType
}
