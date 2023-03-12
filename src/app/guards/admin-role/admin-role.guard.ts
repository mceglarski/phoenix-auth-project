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
import { map, Observable } from 'rxjs';
import { USER_ROLES } from '../../congifuration/user-roles';

@Injectable({
  providedIn: 'root',
})
export class AdminRoleGuard implements CanActivate {
  constructor(private _userService: UserService, private _router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this._userService.getUserRole().pipe(
      map((role) => {
        return role === USER_ROLES.ADMIN
          ? true
          : this._router.parseUrl(ROUTES_DEF.LEADS);
      })
    );
  }
}
