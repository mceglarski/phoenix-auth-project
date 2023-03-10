import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { USER_ROLES } from '../congifuration/user-roles';
import { environment } from '../../environments/environment';
import { CompleteProfileRequest } from '../models/user/complete-profile.request';
import { UserResponse } from '../models/user/user.response';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _httpClient: HttpClient, private _storage: Storage) {}

  public completeProfile(
    completeProfileRequest: CompleteProfileRequest
  ): Observable<void> {
    return this._httpClient
      .post<void>(`${environment.apiUrl}/auth/complete-profile`, {
        data: completeProfileRequest,
      })
      .pipe(tap(() => this.saveProfileToStorage(completeProfileRequest)));
  }

  public getMeInformation(): Observable<UserResponse> {
    return this._httpClient.get<UserResponse>(`${environment.apiUrl}/auth/me`);
  }

  public getProfileCompleted(): Observable<boolean> {
    if (
      this._storage.getItem('firstName') &&
      this._storage.getItem('lastName')
    ) {
      return of(true);
    }
    return of(false);
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

  private saveProfileToStorage(profile: CompleteProfileRequest): void {
    this._storage.setItem('firstName', profile.firstName);
    this._storage.setItem('lastName', profile.lastName);
  }
}