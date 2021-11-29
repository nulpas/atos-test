import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { NotificationsService } from '../_services/notifications/notifications.service';

@Injectable({ providedIn: 'root' }) export class RequestInterceptor implements HttpInterceptor {
  private readonly _errorUrlExceptions: string[];

  constructor(
    private _not: NotificationsService,
    private _router: Router
  ) {
    this._errorUrlExceptions = ['posts-data', 'albums-data', 'one-post-data', 'one-album-data'];
  }

  private _checkErrorUrl(errorUrl: string): boolean {
    if (!!errorUrl) {
      for (const exception of this._errorUrlExceptions) {
        if (errorUrl.includes(exception)) {
          return true;
        }
      }
    }
    return false;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (!this._checkErrorUrl(error.url!)) {
          this._not.triggerNotification$.next({
            notification: {
              message: `Error ${error.message}`,
              type: 'critical'
            }
          });
        }
        return throwError(() => new Error(error.message));
      })
    );
  }
}
