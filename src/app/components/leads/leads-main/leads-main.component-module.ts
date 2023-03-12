import { NgModule } from '@angular/core';
import { LeadsMainComponent } from './leads-main.component';
import { HeaderComponentModule } from '../../common/header/header.component-module';
import { FooterComponentModule } from '../../common/footer/footer.component-module';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
    imports: [CommonModule, HeaderComponentModule, FooterComponentModule, ReactiveFormsModule],
  declarations: [LeadsMainComponent],
  providers: [],
  exports: [LeadsMainComponent],
})
export class LeadsMainComponentModule {}
