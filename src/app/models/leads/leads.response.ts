import {LeadsHiringModel} from "./leads-hiring.model";
import {LeadsCompanySizeModel} from "./leads-company-size.model";

export interface LeadsResponse {
  readonly name: string;
  readonly hiring: LeadsHiringModel;
  readonly activityIds: string[];
  readonly linkedinLink: string;
  readonly industry: string;
  readonly annualRevenue: number;
  readonly companySize: LeadsCompanySizeModel
  readonly websiteLink: string;
  readonly location: string;
}
