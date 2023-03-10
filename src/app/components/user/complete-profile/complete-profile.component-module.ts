import { NgModule } from '@angular/core';
import { CompleteProfileComponent } from './complete-profile.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Overlay } from '@angular/cdk/overlay';
import { ValidationErrorModule } from '../../../pipes/validation-error.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ValidationErrorModule,
  ],
  declarations: [CompleteProfileComponent],
  providers: [MatSnackBar, Overlay],
  exports: [CompleteProfileComponent],
})
export class CompleteProfileComponentModule {}
