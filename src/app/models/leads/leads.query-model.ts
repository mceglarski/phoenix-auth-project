import { LeadsHiringModel } from './leads-hiring.model';
import { LeadsCompanySizeModel } from './leads-company-size.model';
import { LeadsActivitiesResponse } from './leads-activities.response';

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
