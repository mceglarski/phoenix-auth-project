import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, shareReplay } from 'rxjs';
import { ResponseModel } from '../models/response.response';
import { LeadsResponse } from '../models/leads/resposne/leads.response';
import { environment } from '../../environments/environment';
import { LeadsActivitiesResponse } from '../models/leads/resposne/leads-activities.response';
import {CreateLeadRequest} from "../models/leads/request/create-lead.request";

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
      .pipe(
        map((data) => data.data),
        shareReplay(1)
      );
  }

  public createLeadActivity(lead: CreateLeadRequest): Observable<void> {
    return this._httpClient
      .post<void>(
        `${environment.apiUrl}/leads`,
        { data: lead }
      )
      .pipe(
        shareReplay(1)
      );
  }
}
