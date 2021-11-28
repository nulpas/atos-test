import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { NotificationsService } from '../_services/data/notifications.service';

@Injectable({ providedIn: 'root' })
export class RequestInterceptor implements HttpInterceptor {
  constructor(
    private _not: NotificationsService,
    private _router: Router
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        this._not.triggerNotification$.next({
          notification: {
            message: `Error ${error.message}`,
            type: 'critical'
          }
        });
        return throwError(() => new Error(error.message));
      })
    );
  }
}
