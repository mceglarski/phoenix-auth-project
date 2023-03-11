import { LeadsHiringModel } from './leads-hiring.model';
import { LeadsCompanySizeModel } from './leads-company-size.model';
import {LeadsActivitiesQueryModel} from "./leads-activities.query-model";

export interface LeadsQueryModel {
  readonly name: string;
  readonly hiring: LeadsHiringModel;
  // readonly activities: LeadsActivitiesQueryModel[];
  readonly linkedinLink: string;
  readonly industry: string;
  readonly annualRevenue: number;
  readonly companySize: LeadsCompanySizeModel;
  readonly websiteLink: string;
  readonly location: string;
}
