import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import {LeadsService} from "../../../services/leads.service";
import {combineLatest, map, Observable, switchMap} from "rxjs";
import {LeadsQueryModel} from "../../../models/leads/leads.query-model";
import {LeadsResponse} from "../../../models/leads/leads.response";
import {LeadsActivitiesResponse} from "../../../models/leads/leads-activities.response";

@Component({
  selector: 'app-leads-main',
  styleUrls: ['./leads-main.component.scss'],
  templateUrl: './leads-main.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeadsMainComponent {

  constructor(private readonly _leadsService: LeadsService) {
  }

  public readonly leadsList$: Observable<LeadsQueryModel[]> = combineLatest([
    this._leadsService.getLeads(),
    this._leadsService.getLeadsActivities()
  ]).pipe(
    map(([leads, leadsActivities]: [LeadsResponse[], LeadsActivitiesResponse[]]) => {
      console.log(leads);
      console.log(leadsActivities);
      return leads.map((lead) =>
        ({
          name: lead.name,
          hiring: lead.hiring,
          // activities: { name: lead.activityIds.map((activityId) => leadsActivities?.find((activity) => activity.id === activityId)?.name)},
          linkedinLink: lead.linkedinLink,
          industry: lead.industry,
          annualRevenue: lead.annualRevenue,
          companySize: lead.companySize,
          websiteLink: lead.websiteLink,
          location: lead.location
        })
      )
    })
  )
}
