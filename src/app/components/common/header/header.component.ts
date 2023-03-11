import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {Router} from "@angular/router";
import {ROUTES_DEF} from "../../../congifuration/routes-definition";

@Component({
  selector: 'app-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private _collapseNavigation: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public collapseNavigation$: Observable<boolean> =
    this._collapseNavigation.asObservable();

  constructor(private readonly _router: Router) {
  }

  public toggleCollapsedNavigation(): void {
    this._collapseNavigation.next(!this._collapseNavigation.value);
  }

  public redirectToLoggedOut(): void {
    this._router.navigateByUrl(ROUTES_DEF.LOGGED_OUT);
  }
}
