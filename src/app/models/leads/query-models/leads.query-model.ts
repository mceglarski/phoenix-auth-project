import { LeadsHiringModel } from '../shared/leads-hiring.model';
import { LeadsCompanySizeModel } from '../shared/leads-company-size.model';
import { LeadsActivitiesResponse } from '../resposne/leads-activities.response';

export interface LeadsQueryModel {
  readonly name: string;
  readonly hiring: LeadsHiringModel;
  readonly activities: LeadsActivitiesResponse[];
  readonly linkedinLink: string;
  readonly industry: string;
  readonly annualRevenue: number;
  readonly companySize: LeadsCompanySizeModel;
  readonly websiteLink: string;
  readonly location: string;
}
