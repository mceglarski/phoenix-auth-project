import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { catchError, Observable, switchMap, take, throwError } from 'rxjs';
import { UserService } from '../services/user.service';
import { HTTP_ERROR_CODES } from '../congifuration/http-error-codes';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private _userService: UserService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((e) => {
        if (e.status === HTTP_ERROR_CODES.FORBIDDEN) {
          return this._userService.refreshToken().pipe(
            take(1),
            switchMap(() => next.handle(request))
          );
        }
        return throwError(e);
      })
    );
  }
}
