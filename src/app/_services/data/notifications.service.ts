import { Injectable } from '@angular/core';
import { NotificationService } from '@circe/notification';
import { Subject } from 'rxjs';
import { NotificationTrigger } from '../../_types/app.types';

@Injectable({ providedIn: 'root' }) export class NotificationsService {
  public triggerNotification$: Subject<NotificationTrigger> = new Subject();

  constructor(private _notifications: NotificationService) {}
}
