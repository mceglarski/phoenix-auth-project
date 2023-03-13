import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ROUTES_DEF } from '../../../congifuration/routes-definition';
import { AuthenticationService } from '../../../services/authentication.service';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly _collapseNavigation: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public readonly collapseNavigation$: Observable<boolean> =
    this._collapseNavigation.asObservable();

  constructor(
    private readonly _router: Router,
    private readonly _authenticationService: AuthenticationService
  ) {}

  public toggleCollapsedNavigation(): void {
    this._collapseNavigation.next(!this._collapseNavigation.value);
  }

  public onLogout(): void {
    this._authenticationService.logout();
    this._router.navigateByUrl(ROUTES_DEF.LOGGED_OUT);
  }
}
