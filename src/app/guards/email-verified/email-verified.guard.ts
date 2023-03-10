import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { ROUTES_DEF } from '../../congifuration/routes-definition';
import { UserService } from '../../services/user.service';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailVerifiedGuard implements CanActivate {
  constructor(private _userService: UserService, private _router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this._userService.isUserVerified().pipe(
      switchMap((userVerified) => {
        return userVerified
          ? of(true)
          : of(
              this._router.parseUrl(
                route.data['redirectUrlEmail'] || ROUTES_DEF.VERIFY
              )
            );
      })
    );
  }
}
