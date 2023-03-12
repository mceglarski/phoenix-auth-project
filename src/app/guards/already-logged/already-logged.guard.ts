import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { combineLatest, map, Observable, of } from 'rxjs';
import { ROUTES_DEF } from '../../congifuration/routes-definition';
import { UserService } from '../../services/user.service';
import { UserResponse } from '../../models/user/user.response';

@Injectable({
  providedIn: 'root',
})
export class AlreadyLoggedGuard implements CanActivate {
  constructor(
    private readonly _authenticationService: AuthenticationService,
    private readonly _userService: UserService,
    private readonly _router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return combineLatest([
      this._authenticationService.loggedIn$,
      // this._userService.getMeInformation()
    ]).pipe(
      map(([isLoggedIn]: [boolean]) => {
        return isLoggedIn
          ? this._router.parseUrl(route.data['redirectUrl'] || ROUTES_DEF.LEADS)
          : true;
      })
    );
  }
}
