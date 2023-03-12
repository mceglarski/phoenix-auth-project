import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { ROUTES_DEF } from '../../congifuration/routes-definition';
import { AuthenticationService } from '../../services/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private _authenticationService: AuthenticationService,
    private _router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this._authenticationService.loggedIn$.pipe(
      map((isLoggedIn) => {
        return isLoggedIn
          ? true
          : this._router.parseUrl(`${ROUTES_DEF.AUTH}/${ROUTES_DEF.LOGIN}`);
      })
    );
  }
}
