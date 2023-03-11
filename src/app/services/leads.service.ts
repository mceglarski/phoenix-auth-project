import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ResponseModel } from '../models/response.response';
import { LeadsResponse } from '../models/leads/leads.response';
import { environment } from '../../environments/environment';
import { LeadsActivitiesResponse } from '../models/leads/leads-activities.response';

@Injectable({
  providedIn: 'root',
})
export class LeadsService {
  constructor(private _httpClient: HttpClient) {}

  public getLeads(): Observable<LeadsResponse[]> {
    return this._httpClient
      .get<ResponseModel<LeadsResponse[]>>(`${environment.apiUrl}/leads`)
      .pipe(map((data) => data.data));
  }

  public getLeadsActivities(): Observable<LeadsActivitiesResponse[]> {
    return this._httpClient
      .get<ResponseModel<LeadsActivitiesResponse[]>>(
        `${environment.apiUrl}/leads/activities`
      )
      .pipe(map((data) => data.data));
  }
}
