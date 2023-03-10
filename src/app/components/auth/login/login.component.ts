import {ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../services/authentication.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CredentialsRequest} from "../../../models/credentials/credentials.request";
import {take} from "rxjs";
import {ROUTES_DEF} from "../../../congifuration/routes-definition";

@Component({
  selector: 'app-login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  public readonly loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  public formBackendErrorMessage: string = '';

  constructor(
    private _authenticationService: AuthenticationService,
    private _router: Router,
    private _cdr: ChangeDetectorRef,
    private _snackBar: MatSnackBar,
  ) {}

  public onLogin(): void {
    if (this.loginForm.invalid) {
      this._snackBar.open('Form is invalid', 'Close');
      return;
    }
    const { email, password } = this.loginForm.getRawValue();
    const loginFormRequest: CredentialsRequest = {
      email,
      password,
    };

    this._authenticationService
      .login(loginFormRequest)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this._router.navigateByUrl(ROUTES_DEF.LEADS);
        },
        error: (e) => {
          this.formBackendErrorMessage = e.error.message;
          this.loginForm.setErrors({ backendError: true });
          this._cdr.detectChanges();
        },
      });
  }
}
