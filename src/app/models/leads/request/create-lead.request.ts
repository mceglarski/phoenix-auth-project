import { LeadsCompanySizeModel } from '../shared/leads-company-size.model';
import { LeadsHiringModel } from '../shared/leads-hiring.model';

export interface CreateLeadRequest {
  readonly name: string;
  readonly websiteLink: string;
  readonly linkedinLink: string;
  readonly location: string;
  readonly industry: string;
  readonly annualRevenue: number;
  readonly activityIds: string[];
  readonly companySize: LeadsCompanySizeModel;
  readonly hiring: LeadsHiringModel;
}
