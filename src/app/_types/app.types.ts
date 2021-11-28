import { NotificationConfig } from '@circe/notification';

export type ApiConfigFile = {
  BASE_API_URL__MAIN: string;
  BASE_API_URL__SECONDARY: string;
  DATE_DEPLOY: string;
}

export type NotificationTrigger = {
  notification: NotificationConfig;
  timeout?: number;
}
