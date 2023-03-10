import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {CredentialsRequest} from "../models/credentials/credentials.request";
import {CredentialsResponseData} from "../models/credentials/credential.response";
import {ResponseModel} from "../models/response.response";

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private _loggedInSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(this.isUserLogged());
  public loggedIn$: Observable<boolean> = this._loggedInSubject.asObservable();

  constructor(private _httpClient: HttpClient, private _storage: Storage) {}

  public login(
    credentials: CredentialsRequest
  ): Observable<CredentialsResponseData> {
    return this._httpClient
      .post<ResponseModel<CredentialsResponseData>>(
        `${environment.apiUrl}/auth/login`,
        {
          data: credentials,
        }
      )
      .pipe(
        map((data) => data.data),
        tap((data) => {
          this._loggedInSubject.next(true);
          this.saveUserStorage(data);
        })
      );
  }

  public loginAdmin(
    credentials: CredentialsRequest
  ): Observable<CredentialsResponseData> {
    return this._httpClient
      .post<ResponseModel<CredentialsResponseData>>(
        `${environment.apiUrl}/auth/login-admin`,
        {
          data: credentials,
        }
      )
      .pipe(
        map((data) => data.data),
        tap((data) => {
          this._loggedInSubject.next(true);
          this.saveUserStorage(data);
        })
      );
  }

  public logout(): void {
    this._loggedInSubject.next(false);
    this._storage.clear();
  }

  // public isUserVerified(): boolean {
  //   if (this._storage.getItem('accessToken')) {
  //     try {
  //       const token: any = jwt_decode(this._storage.getItem('accessToken')!);
  //       if (token.email_verified) {
  //         return token.email_verified;
  //       }
  //       return false;
  //     } catch (Error) {
  //       return false;
  //     }
  //   }
  //   return false;
  // }

  private isUserLogged(): boolean {
    return this._storage.hasOwnProperty('accessToken') ?? false;
  }

  private saveUserStorage(data: CredentialsResponseData): void {
    this._storage.setItem('id', data.id);
    this._storage.setItem('accessToken', data.accessToken);
    this._storage.setItem('emailVerified', data.emailVerified);
    this._storage.setItem('refreshToken', data.refreshToken);
  }
}