import { NgModule } from '@angular/core';
import { LeadsMainComponent } from './leads-main.component';
import { HeaderComponentModule } from '../../common/header/header.component-module';
import { FooterComponentModule } from '../../common/footer/footer.component-module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, HeaderComponentModule, FooterComponentModule],
  declarations: [LeadsMainComponent],
  providers: [],
  exports: [LeadsMainComponent],
})
export class LeadsMainComponentModule {}
