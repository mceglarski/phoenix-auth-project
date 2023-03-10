import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ROUTES_DEF} from './congifuration/routes-definition';
import {LoginComponent} from './components/auth/login/login.component';
import {LoginComponentModule} from './components/auth/login/login.component-module';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: ROUTES_DEF.AUTH,
        pathMatch: 'full',
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
        ],
      },
    ]),
    LoginComponentModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
