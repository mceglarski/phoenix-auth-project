import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import {CommonModule} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import { Overlay } from '@angular/cdk/overlay';
import {MatButtonModule} from "@angular/material/button";
import {ValidationErrorPipe} from "../../../pipes/validation-error.pipe";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  declarations: [LoginComponent, ValidationErrorPipe],
  providers: [MatSnackBar, Overlay],
  exports: [LoginComponent]
})
export class LoginComponentModule {
}
