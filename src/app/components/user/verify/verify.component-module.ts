import { NgModule } from '@angular/core';
import { VerifyComponent } from './verify.component';
import {MatButtonModule} from "@angular/material/button";

@NgModule({
    imports: [
        MatButtonModule
    ],
  declarations: [VerifyComponent],
  providers: [],
  exports: [VerifyComponent]
})
export class VerifyComponentModule {
}
