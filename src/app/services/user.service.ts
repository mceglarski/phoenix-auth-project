import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, shareReplay, tap } from 'rxjs';
import { USER_ROLES } from '../congifuration/user-roles';
import { environment } from '../../environments/environment';
import { ResponseModel } from '../models/response.response';
import { CompleteProfileResponse } from '../models/user/complete-profile.response';
import { CompleteProfileRequest } from '../models/user/complete-profile.request';
import {
  UserRefreshResponse,
  UserRefreshTokenResponse,
} from '../models/user/user-refresh.response';
import {
  UserRefreshRequest,
  UserRefreshTokenRequest,
} from '../models/user/user-refresh.request';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _httpClient: HttpClient, private _storage: Storage) {}

  public getMyBio(): Observable<ResponseModel<CompleteProfileResponse>> {
    return this._httpClient
      .get<ResponseModel<CompleteProfileResponse>>(
        `${environment.apiUrl}/auth/my-bio`
      )
      .pipe(shareReplay(1));
  }

  public completeProfile(
    completeProfileRequest: CompleteProfileRequest
  ): Observable<void> {
    return this._httpClient.post<void>(`${environment.apiUrl}/auth/add-bio`, {
      data: completeProfileRequest,
    });
  }

  public refreshToken(): Observable<
    UserRefreshResponse<UserRefreshTokenResponse>
  > {
    const refreshRequest: UserRefreshRequest<UserRefreshTokenRequest> = {
      data: {
        refreshToken: this._storage.getItem('refreshToken')!,
      },
    };
    return this._httpClient
      .post<UserRefreshResponse<UserRefreshTokenResponse>>(
        `${environment.apiUrl}/auth/refresh`,
        refreshRequest
      )
      .pipe(
        tap((data) => {
          this._storage.setItem('refreshToken', data.data.refreshToken);
        })
      );
  }

  public getUserRole(): Observable<string> {
    if (this._storage.getItem('accessToken')) {
      const tokenRole = JSON.parse(
        atob(this._storage.getItem('accessToken')!.split('.')[1])
      ).role;

      if (tokenRole) {
        return of(tokenRole);
      }
      return of(USER_ROLES.USER);
    }

    return of('');
  }

  public isUserVerified(): Observable<boolean> {
    if (this._storage.getItem('accessToken')) {
      const token: any = JSON.parse(
        atob(this._storage.getItem('accessToken')!.split('.')[1])
      );
      if (token.email_verified) {
        return of(true);
      }
    }
    return of(false);
  }
}
