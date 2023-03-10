import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { UserService } from '../../services/user.service';
import { ROUTES_DEF } from '../../congifuration/routes-definition';

@Injectable({
  providedIn: 'root',
})
export class ProfileCompletedGuard implements CanActivate {
  constructor(private _userService: UserService, private _router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this._userService.getMyBio().pipe(
      switchMap((data) => {
        return of(true);
      }),
      catchError((e) => {
        if (e.status === 404) {
          return of(this._router.parseUrl(ROUTES_DEF.COMPLETE_PROFILE));
        }
        return of(this._router.parseUrl(ROUTES_DEF.MAIN_PAGE));
      })
    );
  }
}
