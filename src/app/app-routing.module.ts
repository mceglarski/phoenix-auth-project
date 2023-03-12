import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTES_DEF } from './congifuration/routes-definition';
import { LoginComponent } from './components/auth/login/login.component';
import { LoginComponentModule } from './components/auth/login/login.component-module';
import { RegisterComponent } from './components/auth/register/register.component';
import { RegisterComponentModule } from './components/auth/register/register.component-module';
import { VerifyComponent } from './components/user/verify/verify.component';
import { VerifyComponentModule } from './components/user/verify/verify.component-module';
import { EmailVerifiedGuard } from './guards/email-verified/email-verified.guard';
import { LeadsMainComponent } from './components/leads/leads-main/leads-main.component';
import { LeadsMainComponentModule } from './components/leads/leads-main/leads-main.component-module';
import { CompleteProfileComponent } from './components/user/complete-profile/complete-profile.component';
import { CompleteProfileComponentModule } from './components/user/complete-profile/complete-profile.component-module';
import { ProfileCompletedGuard } from './guards/profile-completed/profile-completed.guard';
import { LoggedOutComponent } from './components/user/logged-out/logged-out.component';
import { LoggedOutComponentModule } from './components/user/logged-out/logged-out.component-module';
import { AlreadyLoggedGuard } from './guards/already-logged/already-logged.guard';
import { AuthGuard } from './guards/auth/auth.guard';
import { CreateLeadComponent } from './components/leads/create-lead/create-lead.component';
import { CreateLeadComponentModule } from './components/leads/create-lead/create-lead.component-module';
import { AdminRoleGuard } from './guards/admin-role/admin-role.guard';

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
        canActivate: [AuthGuard],
      },
      {
        path: ROUTES_DEF.LOGGED_OUT,
        component: LoggedOutComponent,
      },
      {
        path: ROUTES_DEF.COMPLETE_PROFILE,
        component: CompleteProfileComponent,
        canActivate: [AuthGuard, EmailVerifiedGuard],
      },
      {
        path: ROUTES_DEF.LEADS,
        component: LeadsMainComponent,
        canActivate: [AuthGuard, EmailVerifiedGuard, ProfileCompletedGuard],
      },
      {
        path: ROUTES_DEF.CREATE_LEAD,
        component: CreateLeadComponent,
        canActivate: [
          AuthGuard,
          AdminRoleGuard,
          EmailVerifiedGuard,
          ProfileCompletedGuard,
        ],
      },
      {
        path: ROUTES_DEF.AUTH,
        canActivate: [AlreadyLoggedGuard],
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
    LeadsMainComponentModule,
    CreateLeadComponentModule,
    CompleteProfileComponentModule,
    LoggedOutComponentModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
