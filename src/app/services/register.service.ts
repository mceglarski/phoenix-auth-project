import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { RegisterResponse } from '../models/register/register.response';
import { ResponseModel } from '../models/response.response';
import { CredentialsRequest } from '../models/credentials/credentials.request';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private _httpClient: HttpClient) {}

  public register(
    credentials: CredentialsRequest
  ): Observable<ResponseModel<RegisterResponse>> {
    return this._httpClient.post<ResponseModel<RegisterResponse>>(
      `${environment.apiUrl}/auth/register2`,
      {
        data: credentials,
      }
    );
  }
}
