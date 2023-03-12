import { NgModule } from '@angular/core';
import { CreateLeadComponent } from './create-lead.component';
import { HeaderComponentModule } from '../../common/header/header.component-module';
import { FooterComponentModule } from '../../common/footer/footer.component-module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {ValidationErrorModule} from "../../../pipes/validation-error.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  imports: [
    CommonModule,
    HeaderComponentModule,
    FooterComponentModule,
    ReactiveFormsModule,
    ValidationErrorModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  declarations: [CreateLeadComponent],
  providers: [],
  exports: [CreateLeadComponent],
})
export class CreateLeadComponentModule {}
