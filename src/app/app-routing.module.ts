import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTES_DEF } from './congifuration/routes-definition';
import { LoginComponent } from './components/auth/login/login.component';
import { LoginComponentModule } from './components/auth/login/login.component-module';
import { RegisterComponent } from './components/auth/register/register.component';
import { RegisterComponentModule } from './components/auth/register/register.component-module';
import { VerifyComponent } from './components/user/verify/verify.component';
import { VerifyComponentModule } from './components/user/verify/verify.component-module';
import { BioComponent } from './components/user/bio/bio.component';
import { BioComponentModule } from './components/user/bio/bio.component-module';
import { EmailVerifiedGuard } from './guards/email-verified/email-verified.guard';
import { LeadsMainComponent } from './components/leads/leads-main/leads-main.component';
import { LeadsMainComponentModule } from './components/leads/leads-main/leads-main.component-module';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: ROUTES_DEF.AUTH,
        pathMatch: 'full',
      },
      {
        path: ROUTES_DEF.VERIFY,
        component: VerifyComponent,
      },
      {
        path: ROUTES_DEF.BIO,
        component: BioComponent,
        canActivate: [EmailVerifiedGuard],
      },
      {
        path: ROUTES_DEF.LEADS,
        component: LeadsMainComponent,
        canActivate: [EmailVerifiedGuard],
      },
      {
        path: ROUTES_DEF.AUTH,
        children: [
          {
            path: '',
            redirectTo: ROUTES_DEF.LOGIN,
            pathMatch: 'full',
          },
          {
            path: ROUTES_DEF.LOGIN,
            component: LoginComponent,
          },
          {
            path: ROUTES_DEF.REGISTER,
            component: RegisterComponent,
          },
        ],
      },
    ]),
    LoginComponentModule,
    RegisterComponentModule,
    VerifyComponentModule,
    BioComponentModule,
    LeadsMainComponentModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
