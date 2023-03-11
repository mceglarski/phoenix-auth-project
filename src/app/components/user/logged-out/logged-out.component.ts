import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { ROUTES_DEF } from '../../../congifuration/routes-definition';

@Component({
  selector: 'app-logged-out',
  styleUrls: ['./logged-out.component.scss'],
  templateUrl: './logged-out.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoggedOutComponent {
  constructor(private readonly _router: Router) {}

  public redirectToLogin(): void {
    this._router.navigateByUrl(`${ROUTES_DEF.AUTH}/${ROUTES_DEF.LOGIN}`);
  }
}
