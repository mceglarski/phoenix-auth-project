import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../../../services/register.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegistrationValidators } from '../validators/registration-validators';
import { CredentialsRequest } from '../../../models/credentials/credentials.request';
import { take } from 'rxjs';
import { ROUTES_DEF } from '../../../congifuration/routes-definition';

@Component({
  selector: 'app-register',
  styleUrls: ['./register.component.scss'],
  templateUrl: './register.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  public readonly registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        RegistrationValidators.numberCharacter,
        RegistrationValidators.specialCharacter,
        RegistrationValidators.capitalCharacter,
        RegistrationValidators.smallCharacter,
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
      termsService: new FormControl(false, [Validators.requiredTrue]),
    },
    { validators: [RegistrationValidators.passwordMatch] }
  );

  public formBackendErrorMessage: string = '';

  constructor(
    private readonly _registerService: RegisterService,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _router: Router,
    private _cdr: ChangeDetectorRef,
    private readonly _snackBar: MatSnackBar
  ) {}

  public onRegister(): void {
    if (this.registerForm.invalid) {
      this._snackBar.open('Form is invalid', 'Close');
      return;
    }
    const { email, password } = this.registerForm.getRawValue();
    const registerFormRequest: CredentialsRequest = {
      email,
      password,
    };

    this._registerService
      .register(registerFormRequest)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this._router.navigateByUrl(ROUTES_DEF.LOGIN);
        },
        error: (e) => {
          this.formBackendErrorMessage = e.error.message;
          this.registerForm.setErrors({ backendError: true });
          this._cdr.detectChanges();
        },
      });
  }
}
