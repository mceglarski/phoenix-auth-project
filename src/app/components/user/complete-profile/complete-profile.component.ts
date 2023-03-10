import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserValidators } from '../user-validators/user-validators';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../../services/user.service';
import { CompleteProfileRequest } from '../../../models/user/complete-profile.request';
import { take } from 'rxjs';
import { ROUTES_DEF } from '../../../congifuration/routes-definition';

@Component({
  selector: 'app-complete-profile',
  styleUrls: ['./complete-profile.component.scss'],
  templateUrl: './complete-profile.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompleteProfileComponent {
  public readonly bioForm: FormGroup = new FormGroup({
    content: new FormControl('', [
      Validators.required,
      UserValidators.bioLength,
    ]),
  });

  public formBackendErrorMessage = '';

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _cdr: ChangeDetectorRef,
    private _snackBar: MatSnackBar
  ) {}

  public onBioComplete(): void {
    if (this.bioForm.invalid) {
      this._snackBar.open('Form is invalid', 'Close');
      return;
    }

    const { content } = this.bioForm.getRawValue();
    const completeProfileRequest: CompleteProfileRequest = {
      content,
    };

    this._userService
      .completeProfile(completeProfileRequest)
      .pipe(take(1))
      .subscribe({
        next: () => {
          this._router.navigateByUrl(ROUTES_DEF.LEADS);
        },
        error: (e) => {
          this.formBackendErrorMessage = e.error.message;
          this.bioForm.setErrors({ backendError: true });
          this._cdr.detectChanges();
        },
      });
  }
}
