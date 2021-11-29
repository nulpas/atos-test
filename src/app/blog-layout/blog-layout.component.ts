import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { GlobalService } from '../_services/global/global.service';
import { NotificationConfig, NotificationService } from '@circe/notification';
import { Subject, takeUntil } from 'rxjs';
import { NotificationTrigger } from '../_types/app.types';
import { NotificationsService } from '../_services/notifications/notifications.service';

@Component({
  selector: 'app-blog-layout',
  templateUrl: './blog-layout.component.html',
  styleUrls: ['./blog-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogLayoutComponent implements OnDestroy {
  public readonly notificationConfig: NotificationConfig;

  private _componentDestroyed$: Subject<void> = new Subject();

  constructor(
    public g: GlobalService,
    private _not: NotificationsService,
    private _notification: NotificationService
  ) {
    this.notificationConfig = {
      elementReference: { name: 'main-content', type: 'id' },
      sendToQueue: true
    };

    this._not.triggerNotification$.pipe(
      takeUntil(this._componentDestroyed$)
    ).subscribe((trigger: NotificationTrigger ) => {
      const _timeout: number = trigger.timeout ?? 0;
      setTimeout(() => {
        this._notification.trigger$.next(trigger.notification);
      }, _timeout);
    });
  }

  ngOnDestroy(): void {
    this._componentDestroyed$.next();
    this._componentDestroyed$.complete();
    this._componentDestroyed$.unsubscribe();
  }
}
