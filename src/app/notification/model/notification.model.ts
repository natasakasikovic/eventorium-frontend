import {NotificationType} from "./notification-type.enum";

export interface Notification {
  title: string;
  message: string;
  seen: boolean;
  type: NotificationType
}
