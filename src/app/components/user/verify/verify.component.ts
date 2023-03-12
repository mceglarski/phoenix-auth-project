import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { AuthenticationService } from '../../../services/authentication.service';
import { Router } from '@angular/router';
import { ROUTES_DEF } from '../../../congifuration/routes-definition';

@Component({
  selector: 'app-verify',
  styleUrls: ['./verify.component.scss'],
  templateUrl: './verify.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerifyComponent {
  constructor(
    private readonly _authenticationService: AuthenticationService,
    private readonly _router: Router
  ) {}

  public logout(): void {
    this._authenticationService.logout();
    this._router.navigateByUrl(`${ROUTES_DEF.AUTH}/${ROUTES_DEF.LOGIN}`);
  }
}
